/**
 * Parent Co-Play Prompts — Weekly conversation starters
 * Matches each eco lesson chapter
 */

export const parentPrompts = [
  {
    id: 'prompt-1',
    chapterId: 'chapter-1',
    chapterTitle: 'Món đồ đến từ đâu?',
    whatChildLearned: 'Tuần này con học rằng một món đồ cần nguyên liệu, công sức và vận chuyển để đến tay mình.',
    questionToAsk: 'Con nghĩ món đồ chơi này đã đi qua những bước nào trước khi đến nhà mình?',
    activity: 'Cùng con chọn một món đồ và đoán nó làm từ chất liệu gì.',
    positiveBehavior: 'Con biết quý trọng đồ vật và hiểu rằng mỗi món đều cần nhiều công sức.',
    timeEstimate: '5 phút',
    emoji: '🏭',
  },
  {
    id: 'prompt-2',
    chapterId: 'chapter-2',
    chapterTitle: 'Vì sao đồ cũ không nên bị bỏ phí?',
    whatChildLearned: 'Tuần này con học rằng nếu một món đồ còn tốt mà bị bỏ đi thì nguyên liệu và công sức tạo ra nó cũng bị lãng phí.',
    questionToAsk: 'Nếu con không dùng món này nữa, ai có thể dùng tiếp nó?',
    activity: 'Cùng con tìm một món đồ có thể tặng, bán hoặc giữ lại.',
    positiveBehavior: 'Con biết suy nghĩ trước khi bỏ đi một món đồ còn dùng được.',
    timeEstimate: '5 phút',
    emoji: '♻️',
  },
  {
    id: 'prompt-3',
    chapterId: 'chapter-3',
    chapterTitle: 'Tái sử dụng là gì?',
    whatChildLearned: 'Tuần này con học rằng tái sử dụng là cho món đồ thêm một cơ hội được dùng tiếp.',
    questionToAsk: 'Con có món đồ nào muốn trao cho bạn khác không? Vì sao?',
    activity: 'Cùng con kiểm tra một món đồ cũ, giặt sạch và quyết định tặng hay bán.',
    positiveBehavior: 'Con biết chăm sóc đồ trước khi trao cho người khác.',
    timeEstimate: '10 phút',
    emoji: '🧸',
  },
  {
    id: 'prompt-4',
    chapterId: 'chapter-4',
    chapterTitle: 'Con cần hay con muốn?',
    whatChildLearned: 'Tuần này con học cách phân biệt nhu cầu thật và mong muốn nhất thời.',
    questionToAsk: 'Món đồ con muốn mua là cần thiết hay chỉ là con đang thích?',
    activity: 'Cùng con chọn một món đồ sẽ chưa mua ngay và ghi vào danh sách "suy nghĩ thêm".',
    positiveBehavior: 'Con biết suy nghĩ kỹ trước khi quyết định mua hàng.',
    timeEstimate: '5 phút',
    emoji: '🤔',
  },
];

/**
 * Impact Reflection Card templates
 */
export const impactCardTemplates = [
  {
    id: 'gift-book',
    actionType: 'gift',
    itemType: 'books',
    title: 'Con đã giúp một cuốn sách có thêm người đọc mới!',
    ecoMeaning: 'Sách không bị bỏ phí và một bạn khác có thể học từ nó.',
    reflectionQ: 'Con nghĩ cuốn sách này sẽ giúp bạn mới điều gì?',
    emoji: '📖',
  },
  {
    id: 'sell-toy',
    actionType: 'sell',
    itemType: 'plastic-toys',
    title: 'Món đồ chơi của con đã có vòng đời thứ hai!',
    ecoMeaning: 'Món đồ còn tốt được dùng tiếp thay vì nằm mãi trong tủ.',
    financialMeaning: 'Con có thêm tiền để chia vào Ví 3 Lọ.',
    reflectionQ: 'Lần sau con sẽ chăm món đồ của mình thế nào để dùng được lâu hơn?',
    emoji: '🚗',
  },
  {
    id: 'fix-backpack',
    actionType: 'fix',
    itemType: 'backpacks',
    title: 'Con đã chọn sửa trước khi mua mới!',
    ecoMeaning: 'Sửa một món đồ giúp con dùng nó lâu hơn và giảm lãng phí.',
    reflectionQ: 'Món đồ nào khác trong nhà có thể sửa thay vì bỏ đi?',
    emoji: '🎒',
  },
  {
    id: 'swap-game',
    actionType: 'swap',
    itemType: 'board-games',
    title: 'Con đã đổi được trò chơi mới!',
    ecoMeaning: 'Đổi đồ giúp cả hai bạn đều có trò mới mà không cần mua thêm.',
    reflectionQ: 'Con thấy đổi đồ vui hơn hay mua mới vui hơn? Vì sao?',
    emoji: '🎲',
  },
  {
    id: 'keep-mindful',
    actionType: 'keep',
    itemType: 'general',
    title: 'Con đã suy nghĩ kỹ trước khi quyết định!',
    ecoMeaning: 'Giữ lại món đồ mình còn cần cũng là một cách tiêu dùng có trách nhiệm.',
    reflectionQ: 'Con sẽ chăm sóc món đồ này thế nào để dùng được lâu hơn?',
    emoji: '💚',
  },
];
