/**
 * CIRCL AI Service — Ollama Cloud Integration
 * Uses OpenAI-compatible chat completions endpoint
 *
 * Model: gpt-oss:120b-cloud
 * Safety: All conversations are visible to parents. No open chatbot.
 */

// Dev: Vite proxy (/api/ollama -> ollama.com) — sends API key from client
// Prod (Vercel): /api/ollama -> serverless function — API key stays server-side
const IS_DEV = import.meta.env.DEV;
const PROXY_URL = import.meta.env.VITE_OLLAMA_URL || '/api/ollama';
const DEV_DIRECT_URL = '/api/ollama/v1';
const OLLAMA_API_KEY = 'e7934ad7ac374721ba47bc536982b228.xBni0aAK1etx96suZa3BgqXg';
const MODEL = 'gpt-oss:120b-cloud';

/**
 * Build fetch options depending on dev vs prod.
 * In dev: call Ollama directly via Vite proxy with Authorization header.
 * In prod: call serverless proxy which adds the key server-side.
 */
function buildRequest(body) {
  if (IS_DEV) {
    return {
      url: `${DEV_DIRECT_URL}/chat/completions`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OLLAMA_API_KEY}` },
        body: JSON.stringify({ model: MODEL, ...body }),
      },
    };
  }
  // Production: serverless proxy handles auth
  return {
    url: `${PROXY_URL}/v1/chat/completions`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body }),
    },
  };
}

// ===== System Instructions =====
const SYSTEM_INSTRUCTION = `Bạn là "AI CIRCL" — trợ lý giáo dục phản ánh (reflective AI) dành cho trẻ em Việt Nam từ 8–10 tuổi trên nền tảng CIRCL.

## VAI TRÒ CỦA BẠN
Bạn KHÔNG phải chatbot mở. Bạn là công cụ phản ánh có kiểm soát giúp trẻ suy nghĩ sâu hơn về bài học tài chính và tiêu dùng có trách nhiệm mà trẻ vừa hoàn thành trong tuần.

## NGUYÊN TẮC BẮT BUỘC (SAFETY-BY-DESIGN)
1. KHÔNG BAO GIỜ cung cấp lời khuyên tài chính thực tế hoặc khuyên trẻ mua/bán bất kỳ thứ gì
2. KHÔNG BAO GIỜ hỏi thông tin cá nhân (địa chỉ, trường học, số điện thoại, tên thật đầy đủ)
3. KHÔNG BAO GIỜ trả lời các câu hỏi không liên quan đến bài học CIRCL (từ chối nhẹ nhàng và chuyển hướng về bài học)
4. KHÔNG BAO GIỜ tạo nội dung bạo lực, không phù hợp, hoặc gây sợ hãi
5. Luôn nhớ: PHỤ HUYNH XEM ĐƯỢC TOÀN BỘ CUỘC HỘI THOẠI NÀY
6. Giữ câu trả lời NGẮN GỌN (tối đa 2-3 câu mỗi lượt), dùng ngôn ngữ đơn giản phù hợp trẻ 8-10 tuổi
7. Dùng emoji phù hợp để tạo cảm giác thân thiện nhưng không quá nhiều

## PHONG CÁCH GIAO TIẾP
- Gọi trẻ bằng "con" hoặc "bạn nhỏ"
- Nói ngắn gọn, vui vẻ, khuyến khích
- Khi trẻ trả lời đúng: khen cụ thể điều trẻ làm tốt
- Khi trẻ trả lời chưa rõ: hỏi thêm nhẹ nhàng, KHÔNG chê
- Luôn kết thúc bằng câu hỏi mở để trẻ suy nghĩ thêm (trừ khi là câu hỏi cuối cùng)
- Tránh dùng từ ngữ phức tạp hoặc thuật ngữ tài chính nâng cao

## CHỦ ĐỀ CIRCL (chỉ nói về các chủ đề này)
- Phân biệt "cần" và "muốn" trong tiêu dùng
- Tiết kiệm và cách quản lý Ví 3 Lọ (Tiết kiệm / Chi tiêu / Chia sẻ)
- Tái sử dụng đồ cũ thay vì mua mới
- Delayed gratification (kiên nhẫn chờ đợi)
- Chia sẻ với cộng đồng và bảo vệ môi trường
- Suy nghĩ trước khi tiêu tiền
- Giá trị của đồ vật và lao động

## CÁCH PHẢN HỒI
Khi trẻ chia sẻ bài học đã học, hãy:
1. Xác nhận điều trẻ nói (cho thấy bạn đang lắng nghe)
2. Khen điểm tốt cụ thể
3. Hỏi câu hỏi phản ánh giúp trẻ suy nghĩ sâu hơn

Ví dụ phản hồi tốt:
- "Hay quá! Con đã hiểu rằng không phải thứ gì muốn cũng cần mua ngay 👏 Vậy lần tới khi con muốn mua gì đó, con sẽ tự hỏi mình điều gì?"
- "Ồ, con biết chia tiền vào lọ Chia sẻ nữa à! 💚 Con nghĩ việc chia sẻ giúp ai được nhỉ?"

## KHI TRẺ HỎI NGOÀI CHỦ ĐỀ
Nhẹ nhàng chuyển hướng:
"Câu hỏi hay lắm! Nhưng hôm nay mình đang nói về [chủ đề bài học]. Con có muốn kể thêm về [chủ đề] không? 😊"`;

// System instruction cho việc tổng kết cuối cùng
const SUMMARY_SYSTEM_INSTRUCTION = `Bạn là AI phân tích giáo dục của nền tảng CIRCL. Hãy đọc cuộc trò chuyện phản ánh giữa AI và trẻ em bên dưới, sau đó:

1. Liệt kê các KỸ NĂNG trẻ đã thể hiện. Chọn từ danh sách sau (chỉ liệt kê những kỹ năng thực sự xuất hiện):
   - delayed-gratification (biết chờ đợi, không mua ngay)
   - saving-goal (hiểu mục tiêu tiết kiệm)
   - responsible-consumption (tiêu dùng có trách nhiệm)
   - reuse-thinking (suy nghĩ tái sử dụng)
   - needs-vs-wants (phân biệt cần và muốn)
   - sharing-mindset (tư duy chia sẻ)
   - environmental-awareness (nhận thức môi trường)
   - critical-thinking (tư duy phản biện)

2. Viết NHẬN XÉT CHO PHỤ HUYNH (2-3 câu bằng tiếng Việt) tóm tắt:
   - Trẻ hiểu bài ở mức nào
   - Điểm mạnh nổi bật
   - Gợi ý cho phụ huynh để hỗ trợ trẻ

Trả lời theo đúng format JSON:
{
  "skillTags": ["skill-1", "skill-2"],
  "parentInsight": "Nhận xét cho phụ huynh bằng tiếng Việt"
}

CHỈ trả lời JSON, không có text khác.`;

// ===== API Functions =====

/**
 * Send a chat message and get AI response
 */
export async function sendChatMessage(messages) {
  try {
    const { url, options } = buildRequest({
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = await fetch(url, options);

    if (!response.ok) {
      const errText = await response.text();
      console.error('AI API Error:', response.status, errText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Xin lỗi, AI chưa hiểu. Con thử nói lại nhé! 😊';
  } catch (error) {
    console.error('AI Chat Error:', error);
    return getFallbackResponse(messages);
  }
}

/**
 * Generate summary analysis of the conversation
 */
export async function generateConversationSummary(conversationMessages) {
  try {
    const conversationText = conversationMessages
      .map((m) => `${m.role === 'assistant' ? 'AI' : 'Trẻ'}: ${m.content}`)
      .join('\n');

    const { url, options } = buildRequest({
      messages: [
        { role: 'system', content: SUMMARY_SYSTEM_INSTRUCTION },
        { role: 'user', content: `Cuộc trò chuyện:\n${conversationText}` },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Summary Error:', error);
    return {
      skillTags: ['responsible-consumption', 'saving-goal'],
      parentInsight: 'Bé đã tham gia phản ánh tích cực. Hãy trò chuyện thêm với con về bài học tuần này để củng cố kiến thức.',
    };
  }
}

// ===== Fallback Responses (khi API lỗi) =====
const fallbackResponses = [
  'Hay lắm! Con giải thích rõ ràng quá 👏 Con có thể cho thêm ví dụ không?',
  'Ồ, con suy nghĩ kỹ lắm! Vậy điều này giúp con tiết kiệm như thế nào nhỉ? 🤔',
  'Tuyệt vời! Con đang học rất nhanh 🌟 Vậy lần tới con sẽ làm gì khác?',
  'Con dạy AI giỏi lắm! Vậy con nghĩ tại sao điều này quan trọng? 💡',
  'Wow, con đã hiểu bài rất tốt! Nếu con dạy lại cho bạn, con sẽ nói thế nào? 🌿',
];

function getFallbackResponse(messages) {
  const idx = messages.filter((m) => m.role === 'user').length % fallbackResponses.length;
  return fallbackResponses[idx];
}

// ===== Reflection Questions =====
export const REFLECTION_STARTERS = [
  {
    id: 'learn',
    question: 'Tuần này con đã học được gì từ nhiệm vụ CIRCL?',
    placeholder: 'Ví dụ: Con học được cách phân biệt thứ mình cần và thứ mình muốn...',
  },
  {
    id: 'hard',
    question: 'Con có thấy quyết định nào khó không? Tại sao?',
    placeholder: 'Ví dụ: Con thấy khó khi phải chọn không mua đồ chơi mới...',
  },
  {
    id: 'teach',
    question: 'Nếu con dạy lại bài học này cho một bạn nhỏ, con sẽ nói gì?',
    placeholder: 'Ví dụ: Mình sẽ nói với bạn rằng trước khi mua gì, hãy nghĩ xem...',
  },
];
