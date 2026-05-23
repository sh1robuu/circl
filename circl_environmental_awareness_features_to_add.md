# CIRCL — Chi tiết các tính năng cần thêm để làm rõ Environmental Awareness

## Mục đích của file

File này dùng để bổ sung vào website/app CIRCL các tính năng học về **environmental awareness** một cách rõ ràng hơn.

Vấn đề hiện tại: nếu website chỉ nhấn mạnh marketplace, Ví 3 Lọ, bán/mua/swap đồ cũ thì người xem sẽ hiểu CIRCL là một app mua bán đồ cũ cho trẻ em. Phần “học bảo vệ môi trường” sẽ bị yếu, giống một lớp phủ marketing chứ chưa phải lõi sản phẩm.

Hướng sửa: đưa phần học môi trường lên trước marketplace.

Định vị nên bám theo câu này:

> CIRCL không bắt đầu từ việc bán đồ cũ. CIRCL bắt đầu từ việc giúp trẻ hiểu vì sao một món đồ nên được dùng tiếp.

Product flow mới:

```text
Học bài ngắn
→ Làm quiz
→ Nhận thử thách xanh
→ Chọn hành động với món đồ cũ
→ Phụ huynh duyệt
→ Marketplace / tặng / swap / giữ / sửa
→ Xem báo cáo tác động
```

Marketplace chỉ là nơi trẻ thực hành bài học. Phần học environmental awareness mới là lõi.

---

# Tổng quan các feature nên thêm

## Nhóm cần thêm ngay vào MVP / website

| # | Feature | Vai trò |
|---|---|---|
| 1 | Học viện Xanh / Eco Learning Path | Core learning hub cho environmental awareness |
| 2 | Tuyến truyện chú Sóc | Storytelling để trẻ học dễ hiểu, không bị khô |
| 3 | Mini Quiz Môi Trường | Kiểm tra trẻ có hiểu bài không |
| 4 | Bách Khoa Đồ Vật | Biến từng món đồ thành bài học về chất liệu, vòng đời, phân hủy, tái sử dụng |
| 5 | Thử Thách Xanh Tuần | Chuyển kiến thức thành hành động thật tại nhà |
| 6 | Impact Reflection Card | Cho trẻ thấy tác động sau mỗi hành động |
| 7 | Parent Co-Play Prompt | Kéo phụ huynh vào quá trình học, tăng retention |

## Nhóm nên để Phase 2 / Premium

| # | Feature | Vai trò |
|---|---|---|
| 8 | Bé Dạy Chú Sóc / Bé Dạy AI | Trẻ giải thích lại kiến thức, chứng minh đã hiểu sâu |
| 9 | Adaptive Learning theo độ tuổi | Cá nhân hóa bài học theo lớp 1-2, lớp 3-4, lớp 5 |
| 10 | Giấy Chứng Nhận Xanh | Tổng kết cuối tháng/năm, phục vụ phụ huynh và B2B |

---

# Feature 1 — Học viện Xanh / Eco Learning Path

## 1. Vai trò trong sản phẩm

Đây là feature quan trọng nhất cần thêm.

Học viện Xanh là khu vực riêng trong app/website nơi trẻ học kiến thức môi trường cơ bản. Nó làm rõ rằng CIRCL không chỉ là marketplace, mà là một sản phẩm giáo dục.

Nếu không có feature này, CIRCL sẽ bị hiểu là:

> “App bán đồ cũ cho trẻ em, có thêm chút thông điệp xanh.”

Nếu có feature này, CIRCL sẽ được hiểu là:

> “App học environmental awareness bằng hành động thật, trong đó marketplace là công cụ thực hành.”

## 2. Mục tiêu giáo dục

Học viện Xanh cần giúp trẻ hiểu 5 khái niệm chính:

1. Một món đồ có vòng đời: được sản xuất, được sử dụng, bị bỏ đi hoặc được dùng tiếp.
2. Đồ chơi/đồ dùng trẻ em không tự nhiên xuất hiện; chúng cần nguyên liệu, năng lượng, vận chuyển và lao động.
3. Vứt bỏ đồ khi còn dùng được là một dạng lãng phí tài nguyên.
4. Tái sử dụng, sửa chữa, chia sẻ, tặng lại hoặc bán lại đều giúp kéo dài vòng đời món đồ.
5. Tiêu dùng có trách nhiệm nghĩa là biết phân biệt “con cần” và “con muốn”.

## 3. Đối tượng

- Trẻ 6-10 tuổi.
- Ưu tiên lớp 1-3.
- Nội dung phải ngắn, trực quan, nhiều hình, ít chữ.
- Không dùng thuật ngữ phức tạp như “carbon footprint”, “circular economy”, “resource efficiency” ở level đầu.
- Có thể dịch các thuật ngữ khó thành ngôn ngữ trẻ em.

Ví dụ:

| Thuật ngữ người lớn | Cách nói cho trẻ |
|---|---|
| Circular economy | Món đồ được dùng thêm một vòng đời mới |
| Resource waste | Phí mất nguyên liệu để làm ra món đồ |
| Product lifecycle | Hành trình của món đồ |
| Responsible consumption | Mua và dùng đồ một cách có suy nghĩ |

## 4. User flow

```text
Bé mở app
→ Chọn Học viện Xanh
→ Chọn chương học
→ Đọc truyện / xem thẻ bài học
→ Làm mini quiz
→ Nhận thử thách xanh
→ Hoàn thành thử thách với phụ huynh
→ Mở chương tiếp theo
```

## 5. Cấu trúc màn hình

### Màn hình chính: Học viện Xanh

Các thành phần nên có:

1. Banner đầu trang:
   - “Hôm nay con học cách giúp một món đồ có thêm vòng đời mới.”

2. Thanh tiến độ:
   - “Con đã hoàn thành 2/8 bài học xanh.”

3. Danh sách chương:
   - Chương 1: Món đồ đến từ đâu?
   - Chương 2: Vì sao đồ cũ không nên bị bỏ phí?
   - Chương 3: Tái sử dụng là gì?
   - Chương 4: Sửa, tặng, bán hay giữ lại?
   - Chương 5: Con cần hay con muốn?
   - Chương 6: Một món đồ có thêm vòng đời mới
   - Chương 7: Gia đình mình giảm lãng phí thế nào?
   - Chương 8: Con trở thành Đại sứ Xanh nhỏ

4. CTA chính:
   - “Học bài hôm nay”
   - “Làm thử thách xanh”
   - “Xem tác động của con”

## 6. Nội dung MVP nên làm trước

Không cần làm quá nhiều bài học ngay. MVP chỉ cần 4 bài học đầu tiên:

### Bài 1: Món đồ đến từ đâu?

Trẻ học rằng một món đồ không tự nhiên xuất hiện. Nó được làm từ chất liệu, máy móc, công sức, đóng gói và vận chuyển.

Ví dụ copy:

> Một chiếc xe đồ chơi có thể được làm từ nhựa, kim loại và sơn màu. Trước khi đến tay con, nó đã đi qua nhiều bước: làm nguyên liệu, sản xuất, đóng gói, vận chuyển và được bày bán.

Mini quiz:

> Một món đồ chơi đến từ đâu?
>
> A. Tự nhiên xuất hiện trong cửa hàng  
> B. Được làm từ nguyên liệu và công sức của nhiều người  
> C. Chỉ cần có tiền là có ngay, không cần ai làm ra
>
> Đáp án đúng: B

### Bài 2: Vì sao đồ cũ không nên bị bỏ phí?

Trẻ học rằng nếu một món đồ còn dùng được mà bị bỏ đi thì nguyên liệu và công sức tạo ra nó cũng bị lãng phí.

Ví dụ copy:

> Khi con không còn chơi một món đồ, món đồ đó chưa chắc đã hết giá trị. Có thể một bạn khác vẫn cần nó, vẫn thích nó và vẫn dùng được nó mỗi ngày.

Mini quiz:

> Nếu một món đồ chơi vẫn còn tốt nhưng con không chơi nữa, cách nào tốt hơn?
>
> A. Vứt đi ngay  
> B. Cất mãi trong tủ  
> C. Tặng, bán lại hoặc đổi để bạn khác dùng tiếp
>
> Đáp án đúng: C

### Bài 3: Tái sử dụng là gì?

Trẻ học rằng tái sử dụng là dùng lại món đồ theo cùng mục đích hoặc mục đích mới, thay vì bỏ đi.

Ví dụ copy:

> Tái sử dụng nghĩa là cho món đồ thêm một cơ hội. Một cuốn sách con đã đọc xong có thể trở thành cuốn sách mới của một bạn khác.

Mini quiz:

> Việc nào là tái sử dụng?
>
> A. Bỏ một cuốn sách còn mới vào thùng rác  
> B. Đưa cuốn sách đó cho một bạn khác đọc tiếp  
> C. Mua thêm 3 cuốn mới dù chưa đọc hết cuốn cũ
>
> Đáp án đúng: B

### Bài 4: Con cần hay con muốn?

Trẻ học phân biệt nhu cầu thật và mong muốn nhất thời.

Ví dụ copy:

> “Con cần” là thứ giúp con học, sinh hoạt hoặc giải quyết một vấn đề thật. “Con muốn” là thứ con thích, nhưng có thể chưa cần mua ngay.

Mini quiz:

> Con đã có 5 hộp bút màu còn dùng tốt. Con thấy một hộp mới rất đẹp. Đây là “cần” hay “muốn”?
>
> A. Cần ngay  
> B. Muốn, nhưng có thể suy nghĩ thêm  
> C. Không cần suy nghĩ, cứ mua
>
> Đáp án đúng: B

## 7. Landing page copy

### Headline

> Học viện Xanh giúp trẻ hiểu vì sao một món đồ nên được dùng tiếp.

### Subheadline

> Qua truyện ngắn, quiz và thử thách thực tế, trẻ học về vòng đời đồ vật, tái sử dụng, giảm lãng phí và tiêu dùng có trách nhiệm.

### 3 bullet trên website

- Trẻ học bằng truyện ngắn, không phải bài giảng dài.
- Mỗi bài học mở khóa một thử thách xanh tại nhà.
- Marketplace chỉ xuất hiện sau khi trẻ hiểu ý nghĩa môi trường của hành động.

## 8. MVP scope

Nên làm:

- 4 bài học đầu.
- 1 tuyến tiến độ đơn giản.
- 1 quiz sau mỗi bài.
- 1 thử thách sau mỗi bài.
- 1 màn hình tổng kết tác động sau thử thách.

Chưa nên làm:

- Cá nhân hóa phức tạp.
- Video hoạt hình nhiều tập.
- AI tự do trả lời mọi thứ.
- Nội dung quá học thuật.
- Quá nhiều badge/sticker không liên quan học thật.

---

# Feature 2 — Tuyến truyện chú Sóc

## 1. Vai trò trong sản phẩm

Tuyến truyện chú Sóc là xương sống storytelling của phần học môi trường.

Trẻ 6-10 tuổi khó hứng thú nếu chỉ đọc bài học dạng giáo trình. Một nhân vật mascot giúp kiến thức môi trường trở nên gần gũi hơn.

Chú Sóc có thể là nhân vật dẫn đường:

- Giới thiệu bài học.
- Đặt câu hỏi cho trẻ.
- Giao thử thách xanh.
- Khen trẻ sau khi hoàn thành nhiệm vụ.
- Nhắc phụ huynh cùng con thảo luận.

## 2. Concept nhân vật

Tên gợi ý:

- Sóc Círcy
- Sóc Xanh
- Sóc CIRCL
- Sóc Lượm Lại
- Sóc Hạt Dẻ

Nên chọn tên dễ nhớ, thân thiện, không quá “brand hóa”.

Đề xuất dùng: **Sóc Círcy** hoặc **Sóc Xanh**.

## 3. Tính cách nhân vật

Chú Sóc nên có 4 tính cách:

1. Tò mò: luôn hỏi “Món đồ này đến từ đâu?”
2. Tiết kiệm: không vứt đồ còn dùng được.
3. Thân thiện: nói chuyện nhẹ nhàng, không dạy đời.
4. Hành động: sau mỗi bài luôn rủ trẻ làm một việc thật.

Không nên làm chú Sóc thành nhân vật quá “game hóa” kiểu dụ trẻ cày điểm.

## 4. Cấu trúc mỗi chương truyện

Mỗi chương nên có format cố định:

```text
1. Mở chuyện: chú Sóc gặp một món đồ bị bỏ quên
2. Vấn đề: món đồ vẫn dùng được nhưng sắp bị vứt đi
3. Bài học: món đồ có vòng đời và giá trị
4. Câu hỏi: bé chọn cách xử lý
5. Quiz: kiểm tra hiểu bài
6. Thử thách: bé làm việc thật tại nhà
7. Mở khóa chương tiếp theo
```

## 5. Danh sách chương MVP

### Chương 1: Chiếc xe đồ chơi bị quên trong góc tủ

Bài học: món đồ vẫn có giá trị dù bé không dùng nữa.

Nội dung chính:

> Sóc Xanh tìm thấy một chiếc xe đồ chơi nằm trong góc tủ. Chiếc xe buồn vì lâu rồi không được ai chơi. Sóc hỏi bé: “Nếu con không chơi nữa, con có cách nào giúp chiếc xe có thêm một người bạn mới không?”

Hành động sau chương:

- Bé tìm 1 món đồ chơi không dùng nữa.
- Bé chọn tình trạng món đồ: còn tốt / cần lau sạch / cần sửa nhẹ / không dùng được.
- Bé hỏi phụ huynh có thể bán, tặng, swap hoặc giữ lại không.

### Chương 2: Hành trình của một cuốn sách

Bài học: một món đồ đi qua nhiều công đoạn trước khi đến tay mình.

Nội dung chính:

> Một cuốn sách kể cho Sóc nghe rằng bạn ấy từng là giấy, từng được in, đóng gói, chở đến cửa hàng rồi mới đến nhà bé. Vì vậy, nếu sách còn tốt, để bạn khác đọc tiếp là một cách tôn trọng hành trình của sách.

Hành động sau chương:

- Bé chọn 1 cuốn sách đã đọc xong.
- Bé quyết định: giữ để đọc lại / tặng / bán / đổi.
- Bé viết hoặc chọn lý do.

### Chương 3: Gấu bông muốn có vòng đời thứ hai

Bài học: đồ vật mềm như gấu bông cần được giữ sạch, dùng lâu, trao lại đúng cách.

Nội dung chính:

> Gấu bông nói với Sóc rằng bạn ấy vẫn còn mềm và sạch, nhưng chủ cũ không còn ôm bạn ấy nữa. Sóc hỏi bé: “Nếu gấu bông còn tốt, làm sao để bạn ấy tiếp tục được yêu thương?”

Hành động sau chương:

- Bé kiểm tra một món đồ vải/gấu bông.
- Bé học bước vệ sinh trước khi bán/tặng.
- Phụ huynh duyệt ảnh, không có mặt trẻ em.

### Chương 4: Cửa hàng nhỏ không lãng phí

Bài học: bán lại/tặng lại không chỉ là kiếm tiền, mà là giúp món đồ được dùng tiếp.

Nội dung chính:

> Sóc mở một cửa hàng nhỏ trong rừng. Nhưng cửa hàng của Sóc không bán đồ mới liên tục. Sóc giúp các món đồ cũ tìm chủ mới.

Hành động sau chương:

- Bé thử tạo listing đầu tiên dưới sự duyệt của phụ huynh.
- Bé chọn lý do environmental impact: “Món đồ này còn dùng tốt”, “Bạn khác có thể dùng tiếp”, “Con không muốn bỏ phí”.

## 6. UI cần có

### Story Card

Một story card nên có:

- Hình chú Sóc.
- 1 đoạn truyện 2-4 câu.
- 1 câu hỏi tương tác.
- 2-3 lựa chọn cho trẻ.
- Nút “Tiếp tục”.

Ví dụ UI copy:

> Sóc Xanh nhìn thấy một chiếc xe đồ chơi nằm yên trong góc tủ.
>
> Sóc hỏi: “Con nghĩ chiếc xe này nên làm gì tiếp theo?”
>
> [Vứt đi] [Tặng bạn khác] [Cất mãi trong tủ]

### Chapter Progress

Hiển thị:

- Chương 1/8.
- Bài học hôm nay.
- Quiz đã xong hay chưa.
- Thử thách đã xong hay chưa.

## 7. Landing page copy

### Headline

> Trẻ học môi trường qua hành trình của chú Sóc.

### Subheadline

> Mỗi tuần, chú Sóc dẫn trẻ qua một câu chuyện ngắn về đồ vật, lãng phí, tái sử dụng và tiêu dùng có trách nhiệm.

### Bullet

- Không phải bài giảng dài.
- Không phải game cày điểm.
- Mỗi chương kết thúc bằng một hành động thật tại nhà.

## 8. MVP scope

Nên làm:

- 4 chương đầu.
- Mỗi chương 6-8 story cards.
- Có quiz cuối chương.
- Có thử thách xanh sau chương.

Chưa nên làm:

- Hoạt hình dài.
- Voice-over phức tạp.
- Nhiều ending phân nhánh.
- Story quá dài khiến trẻ bỏ cuộc.

---

# Feature 3 — Mini Quiz Môi Trường

## 1. Vai trò trong sản phẩm

Quiz là phần kiểm tra trẻ có hiểu bài học môi trường hay không.

Quiz không nên chỉ là trò chơi đúng/sai để nhận điểm. Quiz phải gắn với outcome giáo dục:

- Trẻ hiểu vòng đời món đồ.
- Trẻ biết hành động nào tốt hơn cho môi trường.
- Trẻ phân biệt cần/muốn.
- Trẻ biết lựa chọn bán, tặng, swap, sửa hoặc giữ lại.

## 2. Nguyên tắc thiết kế quiz

1. Mỗi quiz chỉ 3-5 câu.
2. Mỗi câu có 3 lựa chọn.
3. Có giải thích sau đáp án, không chỉ báo đúng/sai.
4. Không làm trẻ xấu hổ khi sai.
5. Dùng ngôn ngữ đời thường.
6. Tránh kiến thức quá học thuật.

## 3. Loại câu hỏi nên có

### Loại 1: Chọn hành động tốt hơn

Ví dụ:

> Con có một món đồ chơi còn dùng tốt nhưng không chơi nữa. Con nên làm gì?
>
> A. Vứt đi  
> B. Để mãi trong tủ  
> C. Tặng, bán lại hoặc đổi để bạn khác dùng tiếp
>
> Đáp án: C  
> Giải thích: Khi bạn khác dùng tiếp, món đồ có thêm một vòng đời mới và ít bị lãng phí hơn.

### Loại 2: Hiểu vòng đời đồ vật

Ví dụ:

> Trước khi đến tay con, một món đồ chơi có thể đã đi qua bước nào?
>
> A. Làm từ nguyên liệu  
> B. Đóng gói và vận chuyển  
> C. Cả A và B
>
> Đáp án: C  
> Giải thích: Vì món đồ cần nguyên liệu, công sức và vận chuyển, nên mình nên dùng nó cẩn thận.

### Loại 3: Phân biệt cần và muốn

Ví dụ:

> Con đã có một chiếc balo còn tốt. Con muốn mua balo mới chỉ vì màu mới đẹp hơn. Đây là gì?
>
> A. Cần  
> B. Muốn  
> C. Bắt buộc phải mua
>
> Đáp án: B  
> Giải thích: Con có thể thích món mới, nhưng nếu món cũ còn dùng tốt thì mình nên suy nghĩ thêm trước khi mua.

### Loại 4: Chọn cách xử lý món đồ

Ví dụ:

> Một cuốn sách còn mới nhưng con đã đọc xong. Cách nào hợp lý nhất?
>
> A. Tặng hoặc bán lại để bạn khác đọc  
> B. Xé đi  
> C. Vứt đi
>
> Đáp án: A  
> Giải thích: Sách còn tốt có thể tiếp tục mang kiến thức cho người khác.

## 4. Quiz flow

```text
Bé đọc truyện/bài học
→ Bấm “Con đã hiểu”
→ Làm 3 câu quiz
→ Nhận giải thích sau mỗi câu
→ Nếu đúng đủ 2/3: mở thử thách xanh
→ Nếu chưa đúng: xem lại bài học bằng bản rút gọn
```

## 5. UI cần có

### Quiz Start Screen

Copy:

> Con đã sẵn sàng giúp Sóc Xanh trả lời 3 câu hỏi chưa?

Button:

> Bắt đầu quiz

### Question Screen

Cần có:

- Câu hỏi lớn, dễ đọc.
- 3 lựa chọn dạng card.
- Icon minh họa.
- Không dùng timer.

### Explanation Screen

Nếu đúng:

> Đúng rồi! Con đã hiểu rằng món đồ còn tốt có thể được dùng tiếp thay vì bị bỏ phí.

Nếu sai:

> Chưa đúng lắm, nhưng không sao. Sóc Xanh giải thích lại nhé: nếu món đồ còn dùng tốt, bạn khác có thể dùng tiếp nó.

### Completion Screen

Copy:

> Con đã hoàn thành bài học hôm nay. Bây giờ hãy thử làm một việc xanh thật ngoài đời nhé.

CTA:

> Nhận Thử Thách Xanh

## 6. Landing page copy

### Headline

> Mini quiz giúp trẻ hiểu bài, không chỉ bấm cho vui.

### Subheadline

> Sau mỗi câu chuyện, trẻ trả lời vài câu hỏi ngắn để củng cố kiến thức về tái sử dụng, giảm lãng phí và tiêu dùng có trách nhiệm.

## 7. MVP scope

Nên làm:

- 4 bộ quiz cho 4 bài đầu.
- Mỗi bộ 3 câu.
- Có giải thích sau mỗi câu.
- Có trạng thái hoàn thành.

Chưa nên làm:

- Bảng xếp hạng điểm quiz.
- Timer gây áp lực.
- Câu hỏi quá dài.
- Điểm số cạnh tranh giữa trẻ.

---

# Feature 4 — Bách Khoa Đồ Vật

## 1. Vai trò trong sản phẩm

Bách Khoa Đồ Vật là feature làm phần environmental awareness trở nên cụ thể nhất.

Thay vì nói chung chung “bảo vệ môi trường”, CIRCL cho trẻ học ngay từ chính món đồ trong nhà:

- Món đồ này làm từ gì?
- Nó có dễ hỏng không?
- Nó có thể dùng được bao lâu?
- Nếu không dùng nữa thì nên làm gì?
- Khi nào nên bán, tặng, sửa, swap hoặc bỏ đúng cách?

## 2. Vì sao feature này quan trọng

Nhiều sản phẩm giáo dục môi trường bị chung chung vì chỉ nói về cây xanh, rác thải, trái đất. Nhưng CIRCL liên quan trực tiếp đến đồ chơi và đồ trẻ em. Vì vậy, Bách Khoa Đồ Vật giúp sản phẩm bám đúng logic:

> Trẻ học môi trường qua đồ vật thật mà trẻ đang sở hữu.

Đây là cầu nối mạnh nhất giữa education và marketplace.

## 3. Danh mục đồ vật MVP

MVP nên bắt đầu với 8 nhóm đồ phổ biến:

| Nhóm đồ | Kiến thức chính |
|---|---|
| Đồ chơi nhựa | Nhựa, độ bền, khó phân hủy, nên dùng lâu |
| Gấu bông / đồ vải | Vải, bông, vệ sinh, tặng lại nếu còn sạch |
| Sách truyện | Giấy, in ấn, đọc lại/tặng/bán lại |
| Bút màu / dụng cụ học tập | Dùng hết trước khi mua mới |
| Balo / túi | Sửa khóa, giặt sạch, dùng nhiều năm |
| Quần áo trẻ em | Nhanh chật, có thể tặng/bán nếu còn tốt |
| Hộp nhựa / hộp đồ chơi | Tái sử dụng để đựng đồ |
| Board game / puzzle | Chia sẻ, đổi với bạn khác |

## 4. Cấu trúc một trang đồ vật

Mỗi item trong Bách Khoa nên có các phần:

### 1. Món này làm từ gì?

Ví dụ: Đồ chơi nhựa

> Nhiều đồ chơi được làm từ nhựa. Nhựa bền và nhẹ, nhưng nếu bị bỏ đi quá sớm, nó có thể nằm rất lâu ngoài môi trường.

### 2. Món này có thể dùng lâu hơn bằng cách nào?

Ví dụ:

> Con có thể lau sạch, cất đúng chỗ, không ném mạnh, không bẻ gãy chi tiết nhỏ.

### 3. Nếu con không dùng nữa thì sao?

Gợi ý hành động:

- Bán lại nếu còn tốt.
- Tặng lại nếu muốn chia sẻ.
- Swap nếu muốn đổi món khác.
- Sửa nếu chỉ hỏng nhẹ.
- Không đăng nếu quá hỏng/bẩn/không an toàn.

### 4. Câu hỏi suy nghĩ

> Món đồ này còn dùng tốt không?
>
> Con có còn cần nó không?
>
> Có bạn nào khác có thể dùng tiếp không?

### 5. CTA

- “Thêm vào Tủ Đồ của con”
- “Làm thử thách với món này”
- “Hỏi phụ huynh để bán/tặng/swap”

## 5. Ví dụ nội dung chi tiết theo từng món

### Đồ chơi nhựa

**Món này làm từ gì?**

> Đồ chơi nhựa thường được làm từ các loại nhựa cứng hoặc nhựa mềm. Nhựa giúp món đồ nhẹ và nhiều màu sắc, nhưng không nên bị vứt bỏ khi vẫn còn dùng được.

**Con nên làm gì để dùng lâu hơn?**

- Không ném mạnh.
- Không để ngoài nắng quá lâu.
- Lau sạch sau khi chơi.
- Cất cùng các món cùng loại.

**Nếu không dùng nữa?**

- Bán lại nếu còn đủ bộ phận.
- Tặng lại nếu còn an toàn.
- Swap với bạn khác nếu hai bên đều thích.
- Không đăng nếu có cạnh sắc, vỡ, nguy hiểm.

**Thông điệp chính:**

> Đồ chơi nhựa còn tốt nên được dùng tiếp thay vì bị bỏ phí.

### Sách truyện

**Món này làm từ gì?**

> Sách được làm từ giấy, mực in và công sức của nhiều người: người viết, người vẽ, người in, người bán.

**Con nên làm gì để dùng lâu hơn?**

- Không xé trang.
- Không vẽ bậy vào sách.
- Để sách nơi khô ráo.
- Cho sách vào kệ sau khi đọc.

**Nếu không dùng nữa?**

- Tặng cho em nhỏ hơn.
- Bán lại nếu còn mới.
- Đổi với bạn khác.
- Giữ lại nếu con muốn đọc lại.

**Thông điệp chính:**

> Một cuốn sách con đã đọc xong vẫn có thể là cuốn sách mới của một bạn khác.

### Gấu bông

**Món này làm từ gì?**

> Gấu bông thường được làm từ vải, bông nhồi và chỉ may. Nếu còn sạch và nguyên vẹn, gấu bông có thể tiếp tục được dùng.

**Con nên làm gì để dùng lâu hơn?**

- Giữ sạch.
- Không kéo rách đường may.
- Giặt hoặc lau theo hướng dẫn của phụ huynh.
- Không để ở nơi ẩm mốc.

**Nếu không dùng nữa?**

- Tặng lại nếu sạch và còn tốt.
- Bán lại nếu còn đẹp.
- Không đăng nếu quá cũ, bẩn, rách hoặc có mùi.

**Thông điệp chính:**

> Một món đồ mềm cũng cần được chăm sóc trước khi trao lại cho người khác.

### Balo

**Món này làm từ gì?**

> Balo thường có vải, dây kéo, quai đeo, lớp lót và nhựa hoặc kim loại nhỏ. Một chiếc balo tốt có thể dùng trong nhiều năm.

**Con nên làm gì để dùng lâu hơn?**

- Không kéo khóa quá mạnh.
- Không nhồi đồ quá nặng.
- Giặt hoặc lau khi bị bẩn.
- Sửa khóa/quai nếu hỏng nhẹ.

**Nếu không dùng nữa?**

- Tặng lại nếu còn chắc chắn.
- Bán lại nếu còn sạch và dùng tốt.
- Sửa trước khi bỏ nếu chỉ hỏng nhẹ.

**Thông điệp chính:**

> Sửa một món đồ đôi khi tốt hơn mua món mới ngay.

## 6. UI cần có

### Object Encyclopedia Card

Mỗi card có:

- Tên món đồ.
- Hình minh họa.
- Tag chất liệu: nhựa / giấy / vải / kim loại.
- Gợi ý hành động: bán / tặng / swap / sửa / giữ.
- Nút “Tìm hiểu món này”.

### Detail Page

Các tab:

1. Làm từ gì?
2. Dùng lâu hơn thế nào?
3. Nếu không dùng nữa?
4. Thử thách với món này

## 7. Landing page copy

### Headline

> Mỗi món đồ trở thành một bài học môi trường.

### Subheadline

> Bé bấm vào đồ chơi, sách, balo hoặc gấu bông để biết món đó làm từ gì, vì sao không nên bỏ phí và cách giúp món đồ có thêm vòng đời mới.

### Bullet

- Học từ đồ vật thật trong nhà.
- Hiểu chất liệu, cách bảo quản và cách tái sử dụng.
- Biết khi nào nên bán, tặng, swap, sửa hoặc giữ lại.

## 8. MVP scope

Nên làm:

- 8 nhóm đồ đầu tiên.
- Mỗi nhóm có 1 trang kiến thức ngắn.
- Gợi ý hành động phù hợp với từng loại đồ.
- Liên kết với listing marketplace.

Chưa nên làm:

- Scan ảnh tự nhận diện đồ bằng AI.
- Dữ liệu phân hủy quá chi tiết, dễ sai.
- So sánh carbon phức tạp.
- Quá nhiều nhóm đồ ngay từ đầu.

---

# Feature 5 — Thử Thách Xanh Tuần

## 1. Vai trò trong sản phẩm

Thử Thách Xanh Tuần là feature biến kiến thức thành hành động.

Nếu chỉ có bài học và quiz, CIRCL sẽ giống app học lý thuyết. Nếu có thử thách thật, CIRCL chứng minh được:

> Trẻ học environmental awareness bằng việc xử lý chính đồ vật của mình.

## 2. Nguyên tắc thiết kế thử thách

1. Mỗi tuần chỉ một thử thách chính.
2. Thử thách phải làm được trong nhà.
3. Không yêu cầu trẻ tự gặp người lạ.
4. Không yêu cầu trẻ tự giao dịch.
5. Mọi ảnh/listing đều cần phụ huynh duyệt.
6. Không chụp mặt trẻ em.
7. Không dùng streak daily vì trẻ không nhất thiết có điện thoại riêng.

## 3. Danh sách thử thách MVP

### Tuần 1: Tìm một món đồ bị quên

Mục tiêu:

- Trẻ nhận ra trong nhà có món đồ còn tốt nhưng không dùng nữa.

Nhiệm vụ:

1. Tìm 1 món đồ chơi/sách/đồ học tập con không dùng 1 tháng qua.
2. Kiểm tra món đó còn tốt không.
3. Chọn lý do vì sao món này không nên bị bỏ phí.

UI copy:

> Hôm nay Sóc Xanh cần con giúp tìm một món đồ đang bị bỏ quên. Món đồ đó có thể vẫn đang chờ một vòng đời mới.

### Tuần 2: Chọn cách xử lý tốt nhất

Mục tiêu:

- Trẻ biết không phải món nào cũng nên bán. Có món nên tặng, có món nên sửa, có món nên giữ.

Nhiệm vụ:

1. Chọn một món đồ.
2. Trả lời 3 câu:
   - Món này còn dùng tốt không?
   - Con còn cần nó không?
   - Bạn khác có thể dùng tiếp không?
3. Chọn: bán / tặng / swap / sửa / giữ lại.

UI copy:

> Không phải món đồ nào cũng cần bán. Con hãy giúp Sóc chọn cách tốt nhất cho món đồ này nhé.

### Tuần 3: Làm sạch trước khi trao lại

Mục tiêu:

- Trẻ học trách nhiệm khi trao món đồ cho người khác.

Nhiệm vụ:

1. Lau sạch/kiểm tra món đồ với phụ huynh.
2. Chụp ảnh món đồ, không chụp mặt người.
3. Viết/chọn mô tả tình trạng.

UI copy:

> Một món đồ được trao đi nên được chăm sóc cẩn thận. Con hãy cùng phụ huynh kiểm tra món đồ trước khi đăng nhé.

### Tuần 4: Kể câu chuyện của món đồ

Mục tiêu:

- Trẻ hiểu món đồ có giá trị sử dụng, không chỉ giá tiền.

Nhiệm vụ:

1. Chọn một món đồ.
2. Chọn câu mô tả:
   - “Con đã từng thích món này vì...”
   - “Món này còn tốt vì...”
   - “Bạn khác có thể dùng món này để...”
3. Phụ huynh duyệt nội dung.

UI copy:

> Mỗi món đồ đều có một câu chuyện. Con hãy kể vì sao món này xứng đáng có thêm một người bạn mới.

### Tuần 5: Con cần hay con muốn?

Mục tiêu:

- Trẻ học tiêu dùng có trách nhiệm trước khi mua đồ khác.

Nhiệm vụ:

1. Chọn một món bé muốn mua.
2. Trả lời:
   - Con đã có món tương tự chưa?
   - Con sẽ dùng món này bao lâu?
   - Con có thể mua đồ cũ/swap thay vì mua mới không?

UI copy:

> Trước khi mua món mới, Sóc Xanh muốn con suy nghĩ: đây là điều con cần, hay là điều con đang muốn?

### Tuần 6: Một món đồ có vòng đời mới

Mục tiêu:

- Trẻ thấy kết quả sau khi bán/tặng/swap thành công.

Nhiệm vụ:

1. Xem món đồ đã được xử lý thế nào.
2. Nhận impact card.
3. Chọn cảm nhận:
   - Con vui vì món đồ được dùng tiếp.
   - Con học được cách không bỏ phí.
   - Con muốn thử với món khác.

UI copy:

> Chúc mừng con! Món đồ của con đã có thêm một vòng đời mới.

## 4. User flow

```text
Bé hoàn thành bài học
→ App mở thử thách xanh liên quan
→ Bé chọn món đồ
→ Bé trả lời 2-3 câu reflection
→ Phụ huynh duyệt ảnh/nội dung/hành động
→ Nếu bán/tặng/swap: chuyển qua flow marketplace an toàn
→ Nếu giữ/sửa: app vẫn ghi nhận hành động học tập
→ Bé nhận Impact Reflection Card
```

## 5. UI cần có

### Weekly Challenge Card

Card gồm:

- Tên thử thách.
- Mục tiêu 1 câu.
- Thời gian ước tính: 5-10 phút.
- Vai trò phụ huynh: cần/không cần.
- CTA: “Bắt đầu thử thách”.

Ví dụ:

> Thử thách tuần này: Tìm một món đồ bị quên  
> Mục tiêu: Giúp con nhận ra món đồ còn tốt có thể được dùng tiếp.  
> Thời gian: 5 phút  
> Cần phụ huynh duyệt: Có

### Challenge Completion Screen

Copy:

> Con đã hoàn thành thử thách xanh tuần này. Sóc Xanh thấy con biết suy nghĩ trước khi bỏ phí một món đồ.

CTA:

- “Xem tác động của con”
- “Hỏi phụ huynh để đăng món đồ”
- “Lưu vào Hành Trình Đồ Vật”

## 6. Landing page copy

### Headline

> Mỗi tuần một thử thách xanh tại nhà.

### Subheadline

> Trẻ không chỉ đọc về môi trường. Trẻ tìm đồ thật, suy nghĩ cách xử lý và hành động cùng phụ huynh.

### Bullet

- Tìm đồ không còn dùng.
- Chọn bán, tặng, swap, sửa hoặc giữ.
- Nhìn thấy tác động sau mỗi hành động.

## 7. MVP scope

Nên làm:

- 6 thử thách đầu tiên.
- Có trạng thái: chưa làm / đang làm / chờ phụ huynh / hoàn thành.
- Có parent approval.
- Có impact card sau khi xong.

Chưa nên làm:

- Thử thách hằng ngày.
- Thử thách cần đi ra ngoài.
- Thử thách cần phối hợp trường lớp.
- BXH cạnh tranh mạnh giữa trẻ.

---

# Feature 6 — Impact Reflection Card

## 1. Vai trò trong sản phẩm

Impact Dashboard lớn có thể để sau, nhưng MVP nên có Impact Reflection Card ngay sau mỗi hành động.

Lý do: trẻ cần thấy “vì sao hành động của mình có ý nghĩa”. Nếu bán/tặng/swap xong mà chỉ hiện tiền, sản phẩm lại nghiêng về tài chính/marketplace. Impact Card kéo trải nghiệm về environmental awareness.

## 2. Khi nào card xuất hiện

Impact Reflection Card nên xuất hiện sau các hành động:

- Hoàn thành quiz.
- Hoàn thành thử thách xanh.
- Phụ huynh duyệt listing.
- Món đồ được bán/tặng/swap thành công.
- Bé chọn sửa/giữ lại thay vì mua mới.

## 3. Nội dung card

Một card nên có 4 phần:

1. Hành động của bé.
2. Ý nghĩa môi trường.
3. Ý nghĩa tài chính nếu có.
4. Câu hỏi reflection.

## 4. Ví dụ card

### Sau khi bé chọn tặng sách

> Con đã giúp một cuốn sách có thêm người đọc mới.
>
> Ý nghĩa xanh: Sách không bị bỏ phí và một bạn khác có thể học từ nó.
>
> Câu hỏi cho con: Con nghĩ cuốn sách này sẽ giúp bạn mới điều gì?

### Sau khi bé bán đồ chơi

> Món đồ chơi của con đã có vòng đời thứ hai.
>
> Ý nghĩa xanh: Món đồ còn tốt được dùng tiếp thay vì nằm mãi trong tủ.
>
> Ý nghĩa tài chính: Con có thêm tiền để chia vào Ví 3 Lọ.
>
> Câu hỏi cho con: Lần sau con sẽ chăm món đồ của mình thế nào để dùng được lâu hơn?

### Sau khi bé quyết định sửa balo

> Con đã chọn sửa trước khi mua mới.
>
> Ý nghĩa xanh: Sửa một món đồ giúp con dùng nó lâu hơn và giảm lãng phí.
>
> Câu hỏi cho con: Món đồ nào khác trong nhà có thể sửa thay vì bỏ đi?

## 5. UI cần có

Card nên đơn giản:

- Icon món đồ.
- Dòng chúc mừng.
- 1 câu impact.
- 1 câu hỏi suy nghĩ.
- Nút “Lưu vào hành trình”.

Không nên làm:

- Số liệu impact quá phức tạp hoặc thiếu căn cứ.
- Claim kiểu “con đã giảm X kg CO2” nếu chưa có cơ sở tính.
- Hiển thị quá nhiều metric khiến phụ huynh nghi ngờ.

## 6. Landing page copy

### Headline

> Trẻ thấy ý nghĩa sau mỗi hành động.

### Subheadline

> Sau khi bán, tặng, swap hoặc sửa một món đồ, CIRCL giải thích cho trẻ vì sao hành động đó giúp giảm lãng phí và kéo dài vòng đời đồ vật.

## 7. MVP scope

Nên làm:

- 5 loại impact card cơ bản.
- Không cần công thức impact phức tạp.
- Dùng ngôn ngữ “đã giúp món đồ được dùng tiếp” thay vì số liệu môi trường khó kiểm chứng.

Chưa nên làm:

- Carbon calculator.
- Báo cáo ESG phức tạp.
- Dashboard quá nhiều biểu đồ.

---

# Feature 7 — Parent Co-Play Prompt

## 1. Vai trò trong sản phẩm

CIRCL dành cho trẻ nhưng phụ huynh là người trả tiền, duyệt hành động và đảm bảo an toàn. Vì vậy, phần environmental awareness phải kéo phụ huynh vào.

Parent Co-Play Prompt giúp phụ huynh biết nên nói gì với con sau mỗi bài học/thử thách.

## 2. Vì sao cần feature này

Nếu chỉ gửi thông báo “con đã hoàn thành bài học”, phụ huynh sẽ không cảm nhận được giá trị giáo dục. Nếu gửi một câu hỏi gợi ý, phụ huynh có thể nói chuyện với con ngay.

Ví dụ:

> Tối nay hỏi con: “Vì sao món đồ còn tốt không nên bị bỏ phí?”

Đây là cách rẻ nhưng tăng perceived value mạnh.

## 3. Nội dung gửi cho phụ huynh

Mỗi tuần gửi 1 prompt ngắn qua app/Zalo/email tùy prototype.

Format:

```text
Tuần này con học: [chủ đề]
Câu hỏi gợi ý: [1 câu phụ huynh hỏi con]
Hoạt động 5 phút: [việc làm cùng con]
Điểm phụ huynh nên khen: [hành vi tích cực]
```

## 4. Ví dụ prompt

### Sau bài “Món đồ đến từ đâu?”

> Tuần này con học rằng một món đồ cần nguyên liệu, công sức và vận chuyển để đến tay mình.
>
> Tối nay hỏi con: “Con nghĩ món đồ chơi này đã đi qua những bước nào trước khi đến nhà mình?”
>
> Hoạt động 5 phút: Cùng con chọn một món đồ và đoán nó làm từ chất liệu gì.

### Sau bài “Tái sử dụng là gì?”

> Tuần này con học rằng món đồ còn tốt có thể có thêm vòng đời mới.
>
> Tối nay hỏi con: “Nếu con không dùng món này nữa, ai có thể dùng tiếp nó?”
>
> Hoạt động 5 phút: Cùng con tìm một món đồ có thể tặng, bán hoặc giữ lại.

### Sau bài “Con cần hay con muốn?”

> Tuần này con học cách phân biệt cần và muốn.
>
> Tối nay hỏi con: “Món đồ con muốn mua là cần thiết hay chỉ là con đang thích?”
>
> Hoạt động 5 phút: Cùng con chọn một món đồ sẽ chưa mua ngay và ghi vào danh sách suy nghĩ thêm.

## 5. UI cần có

### Parent Weekly Card

Card gồm:

- Con học gì tuần này.
- Con đã làm gì.
- Câu hỏi nên hỏi con.
- Gợi ý hoạt động gia đình.
- Nút “Xem chi tiết”.

## 6. Landing page copy

### Headline

> Phụ huynh không chỉ quan sát, mà cùng con học.

### Subheadline

> CIRCL gửi gợi ý trò chuyện hằng tuần để phụ huynh giúp con biến bài học môi trường thành thói quen trong gia đình.

## 7. MVP scope

Nên làm:

- 1 prompt/tuần.
- Nội dung cố định theo bài học.
- Hiển thị trong Parent Dashboard.

Chưa nên làm:

- Cá nhân hóa quá sâu.
- Chatbot tư vấn phụ huynh.
- Báo cáo dài như giáo viên nhận xét.

---

# Feature 8 — Bé Dạy Chú Sóc / Bé Dạy AI

## 1. Vai trò trong sản phẩm

Đây là feature rất khác biệt, nhưng nên để Phase 2 hoặc Premium nhẹ, không nên làm full AI tự do trong MVP.

Ý tưởng: sau khi học, trẻ phải giải thích lại cho chú Sóc. Khi trẻ dạy lại được, khả năng hiểu sâu hơn sẽ rõ hơn so với chỉ làm quiz.

## 2. Product logic

Flow:

```text
Bé học bài
→ Bé làm quiz
→ Chú Sóc nói “Sóc chưa hiểu lắm, con dạy Sóc được không?”
→ Bé chọn câu giải thích hoặc ghi âm/ngắn gọn
→ App phản hồi tích cực
→ Bé nhận badge “Con dạy Sóc thành công”
```

## 3. MVP an toàn hơn AI tự do

Không nên cho trẻ chat tự do với AI ngay từ đầu.

Nên dùng 3 cấp:

### Cấp 1 — Scripted choices

Bé chọn 1 trong 3 câu giải thích.

Ví dụ:

> Vì sao bán lại đồ chơi cũ tốt hơn vứt đi?
>
> A. Vì món đồ còn tốt có thể được bạn khác dùng tiếp.  
> B. Vì vứt đi luôn vui hơn.  
> C. Vì đồ chơi không có giá trị.

### Cấp 2 — Sentence builder

Bé ghép câu từ các mảnh có sẵn:

> “Món đồ còn tốt nên được ____ để ____.”
>
> Lựa chọn: dùng tiếp / bỏ phí / giúp bạn khác / nằm trong tủ

### Cấp 3 — AI hỗ trợ có kiểm soát

Chỉ dùng khi có moderation và parental control. AI không trò chuyện mở rộng, chỉ phản hồi trong phạm vi bài học.

Ví dụ phản hồi:

> Con giải thích đúng rồi. Khi món đồ được dùng tiếp, chúng ta giảm lãng phí và tôn trọng công sức tạo ra món đồ.

## 4. Nội dung mẫu

### Sau bài tái sử dụng

Chú Sóc hỏi:

> Sóc chưa hiểu: vì sao một món đồ cũ vẫn có ích?

Bé trả lời bằng lựa chọn:

> Vì nếu món đồ còn tốt, bạn khác có thể dùng tiếp.

Chú Sóc phản hồi:

> Đúng rồi! Con đã hiểu rằng đồ cũ không có nghĩa là đồ hết giá trị.

### Sau bài cần/muốn

Chú Sóc hỏi:

> Sóc muốn mua một hộp bút mới dù hộp cũ vẫn dùng được. Sóc nên làm gì?

Bé chọn:

> Sóc nên suy nghĩ xem mình cần thật hay chỉ đang muốn.

Chú Sóc phản hồi:

> Cảm ơn con đã dạy Sóc. Suy nghĩ trước khi mua là một thói quen tiêu dùng có trách nhiệm.

## 5. Landing page copy

### Headline

> Khi trẻ dạy lại được, trẻ thật sự hiểu.

### Subheadline

> Với tính năng Bé Dạy Chú Sóc, trẻ giải thích lại bài học môi trường bằng ngôn ngữ của mình, thay vì chỉ bấm đúng/sai.

## 6. MVP scope

Nên để Phase 2/Premium:

- Cấp 1: scripted choices.
- Cấp 2: sentence builder.
- Cấp 3: AI giới hạn sau khi có guardrail.

Chưa nên làm:

- Chat tự do giữa trẻ và AI.
- AI trả lời ngoài phạm vi bài học.
- AI thu thập thông tin cá nhân của trẻ.

---

# Feature 9 — Adaptive Learning theo độ tuổi

## 1. Vai trò trong sản phẩm

Trẻ 6 tuổi và 10 tuổi không học giống nhau. Nếu dùng một nội dung cho tất cả, trẻ nhỏ thấy khó, trẻ lớn thấy chán.

Adaptive Learning giúp CIRCL có vẻ giống sản phẩm giáo dục thật hơn.

## 2. Chia cấp độ

### Level A — Lớp 1-2

Đặc điểm:

- Ít chữ.
- Nhiều hình.
- Câu ngắn.
- Quiz 2-3 câu.
- Chủ yếu chọn đáp án.

Ví dụ:

> Món đồ còn tốt nên được dùng tiếp.

### Level B — Lớp 3-4

Đặc điểm:

- Có giải thích nguyên nhân.
- Quiz 3-4 câu.
- Có câu hỏi reflection ngắn.

Ví dụ:

> Khi một món đồ được dùng tiếp, gia đình mình giảm việc mua mới và giảm lãng phí.

### Level C — Lớp 5

Đặc điểm:

- Có khái niệm vòng đời sản phẩm.
- Có so sánh lựa chọn.
- Có câu hỏi giải thích.

Ví dụ:

> Một món đồ có vòng đời dài hơn khi được bảo quản, sửa chữa hoặc trao lại cho người khác sử dụng.

## 3. Cách triển khai nhẹ trong MVP

Không cần thuật toán phức tạp.

Chỉ cần phụ huynh chọn lớp của con khi onboarding:

- Lớp 1-2
- Lớp 3-4
- Lớp 5

Sau đó app hiển thị version nội dung tương ứng.

## 4. Landing page copy

### Headline

> Bài học được điều chỉnh theo độ tuổi của trẻ.

### Subheadline

> CIRCL dùng cùng một chủ đề môi trường nhưng trình bày khác nhau cho từng nhóm tuổi, để trẻ nhỏ dễ hiểu và trẻ lớn không thấy quá đơn giản.

## 5. MVP scope

Nên làm:

- 3 cấp độ nội dung cho 4 bài đầu.
- Khác nhau ở độ dài câu, số câu quiz, mức độ giải thích.

Chưa nên làm:

- AI adaptive real-time.
- Thuật toán chấm năng lực phức tạp.
- Cá nhân hóa quá sâu từ ngày đầu.

---

# Feature 10 — Giấy Chứng Nhận Xanh

## 1. Vai trò trong sản phẩm

Giấy Chứng Nhận Xanh là feature phục vụ phụ huynh, trung tâm kỹ năng sống và pitch deck.

Nó biến hoạt động của trẻ thành một kết quả nhìn thấy được:

- Con đã học gì.
- Con đã hoàn thành bao nhiêu thử thách.
- Con đã giúp bao nhiêu món đồ được dùng tiếp.
- Con đã biết phân biệt cần/muốn ra sao.

## 2. Khi nào cấp chứng nhận

Có thể cấp theo 3 mốc:

1. Sau khi hoàn thành 4 bài học đầu.
2. Sau khi hoàn thành 1 tháng thử thách xanh.
3. Cuối học kỳ/cuối năm.

## 3. Nội dung chứng nhận

Thông tin nên có:

- Tên bé hoặc nickname do phụ huynh duyệt.
- Số bài học đã hoàn thành.
- Số quiz đã hoàn thành.
- Số thử thách xanh đã làm.
- Số món đồ được bán/tặng/swap/sửa/giữ lại có chủ đích.
- Kỹ năng đã học:
  - Hiểu vòng đời đồ vật.
  - Biết tái sử dụng.
  - Biết giảm lãng phí.
  - Biết phân biệt cần và muốn.
  - Biết quản lý tiền qua Ví 3 Lọ.

## 4. Không nên claim quá đà

Không nên viết:

> Bé đã cứu trái đất.

Không nên viết:

> Bé đã giảm chính xác X kg CO2.

Nên viết:

> Bé đã giúp 5 món đồ có thêm cơ hội được dùng tiếp.

## 5. Landing page copy

### Headline

> Mỗi hành trình học có một kết quả nhìn thấy được.

### Subheadline

> Sau mỗi tháng, phụ huynh có thể xem chứng nhận xanh ghi lại bài học, thử thách và hành động tái sử dụng mà trẻ đã hoàn thành.

## 6. MVP scope

Nên làm:

- Chứng nhận dạng ảnh/PDF đơn giản.
- Tự động tạo cuối tháng.
- Phụ huynh tải về được.

Chưa nên làm:

- Chứng nhận có giá trị học thuật chính thức.
- Claim ESG phức tạp.
- Tích hợp trường học ngay từ đầu.

---

# Cách đưa các feature này lên website

## Section 1 — Product Positioning

### Headline

> CIRCL giúp trẻ học bảo vệ môi trường từ chính những món đồ trong nhà.

### Subheadline

> Trẻ học vòng đời đồ vật, tái sử dụng, giảm lãng phí và tiêu dùng có trách nhiệm qua truyện, quiz, thử thách xanh và marketplace phụ huynh kiểm soát.

### CTA

- Khám phá Học viện Xanh
- Xem cách CIRCL hoạt động

---

## Section 2 — Core Learning Loop

### Headline

> Không chỉ học. Không chỉ bán. Trẻ học rồi hành động.

### 5 bước

```text
1. Học một câu chuyện ngắn
2. Làm mini quiz môi trường
3. Nhận thử thách xanh tại nhà
4. Phụ huynh duyệt hành động
5. Xem tác động của món đồ
```

### Copy ngắn

> Marketplace chỉ xuất hiện sau bài học, để trẻ biến kiến thức thành hành động thật.

---

## Section 3 — Feature Cards

Nên dùng 4 card chính, không quá nhiều:

### Card 1 — Học viện Xanh

> Trẻ học về vòng đời đồ vật, tái sử dụng, giảm lãng phí và tiêu dùng có trách nhiệm qua bài học ngắn.

### Card 2 — Bách Khoa Đồ Vật

> Mỗi món đồ trở thành một bài học: làm từ gì, dùng lâu hơn thế nào, và nên bán, tặng, sửa hay giữ.

### Card 3 — Thử Thách Xanh Tuần

> Mỗi tuần, trẻ làm một nhiệm vụ thực tế cùng phụ huynh để biến kiến thức môi trường thành hành động.

### Card 4 — Marketplace An Toàn

> Trẻ đề xuất bán, tặng hoặc swap đồ cũ. Phụ huynh duyệt toàn bộ, không chat trẻ em, không giao dịch tiền trong app.

---

## Section 4 — Example Learning Journey

### Headline

> Ví dụ: một chiếc xe đồ chơi có vòng đời mới

### Flow

```text
Bé học: Chiếc xe đồ chơi đến từ đâu?
→ Bé làm quiz: Vì sao không nên vứt đồ còn tốt?
→ Bé nhận thử thách: Tìm một món đồ không dùng nữa
→ Bé chọn chiếc xe đồ chơi
→ Phụ huynh duyệt ảnh và mô tả
→ Xe được bán/tặng/swap cho gia đình khác
→ Bé thấy impact: “Con đã giúp món đồ có thêm vòng đời mới”
```

---

## Section 5 — Parent Value

### Headline

> Phụ huynh thấy con học gì, làm gì và tiến bộ thế nào.

### Subheadline

> CIRCL gửi báo cáo tuần và gợi ý trò chuyện để phụ huynh cùng con xây thói quen tiêu dùng có trách nhiệm.

### Bullet

- Xem bài học con đã hoàn thành.
- Duyệt mọi ảnh, listing và hành động.
- Nhận câu hỏi gợi ý để nói chuyện với con.
- Theo dõi Ví 3 Lọ và impact của con.

---

# Thứ tự ưu tiên build

## Ưu tiên 1 — Cần làm ngay để website/app ra đúng CIRCL

1. Học viện Xanh.
2. Tuyến truyện chú Sóc.
3. Mini Quiz Môi Trường.
4. Thử Thách Xanh Tuần.
5. Bách Khoa Đồ Vật bản đơn giản.

## Ưu tiên 2 — Làm sau khi core learning loop chạy được

6. Impact Reflection Card.
7. Parent Co-Play Prompt.
8. Giấy Chứng Nhận Xanh.

## Ưu tiên 3 — Phase 2 / Premium

9. Bé Dạy Chú Sóc / Bé Dạy AI.
10. Adaptive Learning theo độ tuổi.
11. Hoạt hình chú Sóc.
12. BXH Impact khu vực.

---

# Phần không nên build hoặc không nên đưa nổi bật lúc này

## Không nên đưa lên trước phần học

- Cửa hàng của bé.
- Boost listing.
- Trust score.
- BXH khu vực.
- Marketplace statistics.
- Shop customization.

Lý do: các phần này làm CIRCL trông giống marketplace/e-commerce hơn là education product.

## Không nên build trong MVP

- Chat giữa trẻ em.
- AI chat tự do.
- Escrow/thanh toán trong app.
- Logistics vật lý.
- Thuê đồ.
- Streak daily.
- Vòng quay may mắn.
- Carbon calculator phức tạp.
- Claims môi trường không có căn cứ.

---

# Checklist cho designer/coder

## Landing page cần có

- [ ] Hero nói rõ “học environmental awareness”, không chỉ “bán đồ cũ”.
- [ ] Section Core Learning Loop: Học → Quiz → Thử thách → Phụ huynh duyệt → Impact.
- [ ] Feature card riêng cho Học viện Xanh.
- [ ] Feature card riêng cho Bách Khoa Đồ Vật.
- [ ] Feature card riêng cho Thử Thách Xanh.
- [ ] Marketplace đặt sau phần học.
- [ ] Có câu “Marketplace là nơi thực hành, không phải lõi duy nhất”.
- [ ] Có parent control rõ: không chat, không ảnh mặt trẻ, phụ huynh duyệt.

## App/prototype cần có

- [ ] Màn hình Học viện Xanh.
- [ ] 4 chương truyện đầu.
- [ ] 4 bộ quiz môi trường.
- [ ] 6 thử thách xanh đầu.
- [ ] 8 nhóm đồ trong Bách Khoa Đồ Vật.
- [ ] Parent approval cho ảnh/listing/action.
- [ ] Impact card sau mỗi hành động.
- [ ] Parent weekly prompt.

---

# Copy tổng hợp có thể dùng ngay

## One-liner

> CIRCL biến đồ cũ thành bài học môi trường và tài chính cho trẻ.

## Hero headline

> Trẻ học bảo vệ môi trường từ chính những món đồ trong nhà.

## Hero subheadline

> CIRCL giúp trẻ 6-10 tuổi học vòng đời đồ vật, tái sử dụng, giảm lãng phí và quản lý tiền qua thử thách xanh và marketplace do phụ huynh kiểm soát.

## Learning feature headline

> Học viện Xanh: nơi trẻ hiểu vì sao món đồ nên được dùng tiếp.

## Marketplace positioning

> Marketplace không phải đích đến. Marketplace là nơi trẻ thực hành bài học về tái sử dụng và tiêu dùng có trách nhiệm.

## Parent value copy

> Phụ huynh kiểm soát toàn bộ ảnh, listing và giao dịch; đồng thời theo dõi con học gì, làm gì và tiến bộ ra sao mỗi tuần.

## Safety copy

> CIRCL không có chat giữa trẻ em, không giữ tiền người dùng, không cho phép ảnh có mặt trẻ, và mọi hành động đều cần phụ huynh duyệt.

---

# Kết luận

Các feature cần thêm không phải là thêm nhiều marketplace function. Việc cần làm là đưa environmental awareness thành một product layer rõ ràng trước marketplace.

Bộ tối thiểu nên thêm:

1. Học viện Xanh.
2. Tuyến truyện chú Sóc.
3. Mini Quiz Môi Trường.
4. Bách Khoa Đồ Vật.
5. Thử Thách Xanh Tuần.
6. Impact Reflection Card.
7. Parent Co-Play Prompt.

Nếu build đúng 7 feature này, CIRCL sẽ không còn bị hiểu là “chợ đồ cũ cho trẻ em”, mà trở thành một app giáo dục môi trường và tài chính có hành động thực tế.
