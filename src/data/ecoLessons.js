/**
 * Eco Academy Lessons — Sóc Xanh Storytelling + Quiz Data
 * 4 MVP chapters with story cards, quiz questions, and green challenges
 */

export const ecoLessons = [
  {
    id: 'chapter-1',
    week: 1,
    title: 'Món đồ đến từ đâu?',
    subtitle: 'Học về hành trình của một món đồ',
    emoji: '🚗',
    status: 'active', // active | locked | completed
    xpReward: 30,
    storyCards: [
      { type: 'narration', speaker: 'soc', text: 'Chào con! Hôm nay Sóc Xanh muốn kể cho con nghe về hành trình của một chiếc xe đồ chơi nhé! 🐿️' },
      { type: 'narration', speaker: 'soc', text: 'Sóc tìm thấy chiếc xe đồ chơi nằm trong góc tủ. Chiếc xe buồn vì lâu rồi không được ai chơi... 😢' },
      { type: 'lesson', text: 'Một chiếc xe đồ chơi có thể được làm từ nhựa, kim loại và sơn màu. Trước khi đến tay con, nó đã đi qua nhiều bước: làm nguyên liệu → sản xuất → đóng gói → vận chuyển → bày bán.', emoji: '🏭' },
      { type: 'lesson', text: 'Vì vậy, mỗi món đồ đều chứa công sức của rất nhiều người. Nếu mình giữ gìn và dùng lâu hơn, mình đang tôn trọng công sức đó! 💪', emoji: '❤️' },
      { type: 'interaction', speaker: 'soc', text: 'Sóc hỏi con nè: "Nếu con không chơi chiếc xe nữa, con có cách nào giúp chiếc xe có thêm một người bạn mới không?"', choices: ['Vứt đi', 'Tặng bạn khác', 'Cất mãi trong tủ'], correctIdx: 1, feedback: ['Ồ, vứt đi thì phí lắm! Chiếc xe vẫn còn chơi được mà 🥺', 'Đúng rồi! Tặng bạn khác là cách tuyệt vời! 🎉', 'Cất mãi thì chiếc xe buồn lắm, không ai chơi cùng 😢'] },
      { type: 'narration', speaker: 'soc', text: 'Tuyệt vời! Con đã hiểu rằng một món đồ không tự nhiên xuất hiện. Nó cần rất nhiều công sức để được tạo ra! 🌟' },
    ],
    quiz: [
      { id: 'q1-1', question: 'Một món đồ chơi đến từ đâu?', options: ['Tự nhiên xuất hiện trong cửa hàng', 'Được làm từ nguyên liệu và công sức của nhiều người', 'Chỉ cần có tiền là có ngay, không cần ai làm ra'], correct: 1, explanation: 'Mỗi món đồ cần nguyên liệu, công nhân sản xuất, đóng gói và vận chuyển. Vì vậy mình nên trân trọng và dùng cẩn thận nhé!' },
      { id: 'q1-2', question: 'Vì sao mình nên giữ gìn đồ chơi?', options: ['Vì đồ chơi rất đắt', 'Vì nhiều người đã làm việc vất vả để tạo ra nó', 'Vì mẹ sẽ la nếu làm hỏng'], correct: 1, explanation: 'Đúng rồi! Giữ gìn đồ chơi là cách mình tôn trọng công sức của những người đã tạo ra nó 👏' },
      { id: 'q1-3', question: 'Nếu một món đồ chơi vẫn còn tốt nhưng con không chơi nữa, cách nào tốt hơn?', options: ['Vứt đi ngay', 'Cất mãi trong tủ', 'Tặng, bán lại hoặc đổi để bạn khác dùng tiếp'], correct: 2, explanation: 'Khi bạn khác dùng tiếp, món đồ có thêm một vòng đời mới và ít bị lãng phí hơn! 🌿' },
    ],
    greenChallenge: {
      title: 'Tìm một món đồ bị quên',
      description: 'Hôm nay Sóc Xanh cần con giúp tìm một món đồ đang bị bỏ quên. Món đồ đó có thể vẫn đang chờ một vòng đời mới!',
      tasks: ['Tìm 1 món đồ chơi/sách/đồ học tập con không dùng 1 tháng qua', 'Kiểm tra món đó còn tốt không', 'Chọn lý do vì sao món này không nên bị bỏ phí'],
      timeEstimate: '5 phút',
      needsParent: true,
    },
  },
  {
    id: 'chapter-2',
    week: 2,
    title: 'Vì sao đồ cũ không nên bị bỏ phí?',
    subtitle: 'Hành trình của một cuốn sách',
    emoji: '📚',
    status: 'locked',
    xpReward: 30,
    storyCards: [
      { type: 'narration', speaker: 'soc', text: 'Hôm nay Sóc Xanh gặp một cuốn sách rất buồn. Cuốn sách kể rằng bạn ấy đã bị để mãi trên kệ, không ai đọc nữa... 📖' },
      { type: 'lesson', text: 'Một cuốn sách kể cho Sóc nghe rằng bạn ấy từng là giấy, từng được in, đóng gói, chở đến cửa hàng rồi mới đến nhà bé.', emoji: '📖' },
      { type: 'lesson', text: 'Khi con không còn chơi một món đồ, món đồ đó chưa chắc đã hết giá trị. Có thể một bạn khác vẫn cần nó, vẫn thích nó và vẫn dùng được nó mỗi ngày! 💚', emoji: '💡' },
      { type: 'interaction', speaker: 'soc', text: 'Nếu sách còn tốt, để bạn khác đọc tiếp là một cách tôn trọng hành trình của sách. Con nghĩ sao?', choices: ['Đúng, sách nên được đọc tiếp', 'Không, cứ để mãi trên kệ', 'Xé đi cho rồi'], correctIdx: 0, feedback: ['Hay quá! Con hiểu rồi! 🎉', 'Để mãi thì phí quá, bạn khác có thể rất thích cuốn này đó 😊', 'Ôi không, xé sách thì phí lắm! Sách còn nhiều kiến thức mà 📚'] },
      { type: 'narration', speaker: 'soc', text: 'Sóc vui quá! Con đã hiểu rằng đồ cũ không có nghĩa là đồ hết giá trị! 🌟' },
    ],
    quiz: [
      { id: 'q2-1', question: 'Nếu một món đồ chơi vẫn còn tốt nhưng con không chơi nữa, cách nào tốt hơn?', options: ['Vứt đi ngay', 'Cất mãi trong tủ', 'Tặng, bán lại hoặc đổi để bạn khác dùng tiếp'], correct: 2, explanation: 'Khi bạn khác dùng tiếp, món đồ có thêm một vòng đời mới và ít bị lãng phí hơn! ♻️' },
      { id: 'q2-2', question: 'Một cuốn sách con đã đọc xong có giá trị gì không?', options: ['Không, đã đọc rồi thì hết giá trị', 'Có, bạn khác có thể đọc và học từ nó', 'Chỉ có giá trị nếu sách còn mới tinh'], correct: 1, explanation: 'Sách đã đọc vẫn chứa kiến thức. Bạn khác có thể học được nhiều điều từ cuốn sách đó! 📚' },
      { id: 'q2-3', question: 'Vì sao không nên bỏ phí đồ còn dùng được?', options: ['Vì nguyên liệu và công sức tạo ra nó sẽ bị lãng phí', 'Vì đồ cũ luôn đắt hơn đồ mới', 'Vì không có lý do gì cả'], correct: 0, explanation: 'Mỗi món đồ cần nguyên liệu và công sức để tạo ra. Bỏ phí đồ còn tốt = lãng phí tài nguyên! 🌍' },
    ],
    greenChallenge: {
      title: 'Chọn cách xử lý tốt nhất',
      description: 'Không phải món đồ nào cũng cần bán. Con hãy giúp Sóc chọn cách tốt nhất cho món đồ này nhé.',
      tasks: ['Chọn một món đồ không dùng nữa', 'Trả lời: Món này còn dùng tốt không? Con còn cần nó không? Bạn khác có thể dùng tiếp không?', 'Chọn: bán / tặng / swap / sửa / giữ lại'],
      timeEstimate: '5 phút',
      needsParent: true,
    },
  },
  {
    id: 'chapter-3',
    week: 3,
    title: 'Tái sử dụng là gì?',
    subtitle: 'Gấu bông muốn có vòng đời thứ hai',
    emoji: '🧸',
    status: 'locked',
    xpReward: 35,
    storyCards: [
      { type: 'narration', speaker: 'soc', text: 'Hôm nay Sóc gặp một chú gấu bông. Gấu bông nói rằng bạn ấy vẫn còn mềm và sạch, nhưng chủ cũ không còn ôm bạn ấy nữa... 🧸' },
      { type: 'lesson', text: 'Tái sử dụng nghĩa là cho món đồ thêm một cơ hội. Một cuốn sách con đã đọc xong có thể trở thành cuốn sách mới của một bạn khác!', emoji: '♻️' },
      { type: 'lesson', text: 'Tái sử dụng không chỉ là bán lại. Tặng, swap, sửa chữa — tất cả đều là cách giúp món đồ có thêm vòng đời mới! 💚', emoji: '🔄' },
      { type: 'interaction', speaker: 'soc', text: 'Sóc hỏi bé: "Nếu gấu bông còn tốt, làm sao để bạn ấy tiếp tục được yêu thương?"', choices: ['Vứt vào thùng rác', 'Tặng cho em nhỏ hơn', 'Để bạn ấy bụi bặm mãi'], correctIdx: 1, feedback: ['Ôi không! Gấu bông còn tốt mà 🥺', 'Tuyệt vời! Em nhỏ sẽ rất vui khi có bạn gấu mới! 🎉', 'Gấu bông sẽ buồn lắm nếu bị bỏ quên mãi 😢'] },
      { type: 'lesson', text: 'Trước khi trao đồ cho người khác, mình nên: giặt sạch, kiểm tra xem còn tốt không, và nhờ phụ huynh giúp chụp ảnh! 📸', emoji: '✨' },
      { type: 'narration', speaker: 'soc', text: 'Con giỏi lắm! Tái sử dụng là cách yêu thương cả món đồ lẫn Trái Đất! 🌍💚' },
    ],
    quiz: [
      { id: 'q3-1', question: 'Việc nào là tái sử dụng?', options: ['Bỏ một cuốn sách còn mới vào thùng rác', 'Đưa cuốn sách đó cho một bạn khác đọc tiếp', 'Mua thêm 3 cuốn mới dù chưa đọc hết cuốn cũ'], correct: 1, explanation: 'Tái sử dụng = cho món đồ thêm một cơ hội được dùng tiếp! 📖' },
      { id: 'q3-2', question: 'Trước khi tặng gấu bông cho bạn khác, con nên làm gì?', options: ['Không cần làm gì, cứ tặng thôi', 'Giặt sạch và kiểm tra xem còn tốt không', 'Vẽ bậy lên rồi tặng'], correct: 1, explanation: 'Chăm sóc món đồ trước khi trao đi thể hiện sự tôn trọng với người nhận! ✨' },
      { id: 'q3-3', question: 'Tái sử dụng giúp gì cho môi trường?', options: ['Không giúp gì cả', 'Giảm lãng phí vì đồ còn tốt được dùng tiếp', 'Chỉ giúp tiết kiệm tiền'], correct: 1, explanation: 'Đúng! Khi đồ được dùng tiếp, mình giảm việc sản xuất đồ mới và giảm rác thải! 🌿' },
    ],
    greenChallenge: {
      title: 'Làm sạch trước khi trao lại',
      description: 'Một món đồ được trao đi nên được chăm sóc cẩn thận. Con hãy cùng phụ huynh kiểm tra món đồ trước khi đăng nhé.',
      tasks: ['Lau sạch/kiểm tra món đồ với phụ huynh', 'Chụp ảnh món đồ (không chụp mặt người)', 'Viết/chọn mô tả tình trạng'],
      timeEstimate: '10 phút',
      needsParent: true,
    },
  },
  {
    id: 'chapter-4',
    week: 4,
    title: 'Con cần hay con muốn?',
    subtitle: 'Học tiêu dùng có trách nhiệm',
    emoji: '🤔',
    status: 'locked',
    xpReward: 35,
    storyCards: [
      { type: 'narration', speaker: 'soc', text: 'Hôm nay Sóc Xanh muốn đi mua hộp bút màu mới. Nhưng khoan... Sóc đã có 3 hộp bút còn dùng tốt rồi mà! 🖍️' },
      { type: 'lesson', text: '"Con cần" là thứ giúp con học, sinh hoạt hoặc giải quyết một vấn đề thật. "Con muốn" là thứ con thích, nhưng có thể chưa cần mua ngay.', emoji: '💡' },
      { type: 'interaction', speaker: 'soc', text: 'Con đã có 5 hộp bút màu còn dùng tốt. Con thấy một hộp mới rất đẹp. Đây là "cần" hay "muốn"?', choices: ['Cần ngay', 'Muốn, nhưng có thể suy nghĩ thêm', 'Không cần suy nghĩ, cứ mua'], correctIdx: 1, feedback: ['Hmm, con đã có 5 hộp rồi mà. Nghĩ lại xem nhé! 🤔', 'Đúng rồi! Suy nghĩ trước khi mua là rất thông minh! 🌟', 'Ôi, cứ mua mà không suy nghĩ thì dễ lãng phí lắm! 💸'] },
      { type: 'lesson', text: 'Tiêu dùng có trách nhiệm nghĩa là biết phân biệt "con cần" và "con muốn". Không phải thứ gì muốn cũng cần mua ngay! ⏳', emoji: '🧠' },
      { type: 'narration', speaker: 'soc', text: 'Sóc đã học được: suy nghĩ trước khi mua là một thói quen tuyệt vời! Cảm ơn con đã dạy Sóc! 🐿️💚' },
    ],
    quiz: [
      { id: 'q4-1', question: 'Con đã có một chiếc balo còn tốt. Con muốn mua balo mới chỉ vì màu mới đẹp hơn. Đây là gì?', options: ['Cần', 'Muốn', 'Bắt buộc phải mua'], correct: 1, explanation: 'Con có thể thích món mới, nhưng nếu món cũ còn dùng tốt thì mình nên suy nghĩ thêm trước khi mua! 🤔' },
      { id: 'q4-2', question: 'Khi nào thì mình "cần" mua đồ mới?', options: ['Khi đồ cũ hỏng không sửa được và mình cần dùng', 'Khi thấy bạn khác có đồ mới', 'Khi muốn có nhiều đồ nhất lớp'], correct: 0, explanation: 'Mua mới khi thật sự cần, không phải vì muốn giống bạn khác! 💪' },
      { id: 'q4-3', question: 'Tiêu dùng có trách nhiệm nghĩa là gì?', options: ['Mua tất cả những gì mình thích', 'Suy nghĩ kỹ trước khi mua và dùng đồ cẩn thận', 'Không bao giờ mua gì cả'], correct: 1, explanation: 'Tiêu dùng có trách nhiệm = suy nghĩ + dùng cẩn thận + không lãng phí! 🌿' },
    ],
    greenChallenge: {
      title: 'Kể câu chuyện của món đồ',
      description: 'Mỗi món đồ đều có một câu chuyện. Con hãy kể vì sao món này xứng đáng có thêm một người bạn mới.',
      tasks: ['Chọn một món đồ không dùng nữa', 'Chọn câu mô tả: "Con đã từng thích vì...", "Món này còn tốt vì...", "Bạn khác có thể dùng để..."', 'Nhờ phụ huynh duyệt nội dung'],
      timeEstimate: '10 phút',
      needsParent: true,
    },
  },
];

export const ecoProgressLabels = {
  'chapter-1': { short: 'Bài 1', emoji: '🚗' },
  'chapter-2': { short: 'Bài 2', emoji: '📚' },
  'chapter-3': { short: 'Bài 3', emoji: '🧸' },
  'chapter-4': { short: 'Bài 4', emoji: '🤔' },
};
