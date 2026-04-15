export interface Question {
  id: string;
  text: string;
  correctAnswer: 'A' | 'B'; // A = True, B = False
}

export const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'Động năng là năng lượng của sự chuyển động.',
    correctAnswer: 'A',
  },
  {
    id: '2',
    text: 'Pin lưu trữ năng lượng điện dưới dạng hóa năng dự trữ.',
    correctAnswer: 'A',
  },
  {
    id: '3',
    text: 'Năng lượng âm thanh có thể truyền đi trong môi trường chân không.',
    correctAnswer: 'B',
  },
  {
    id: '4',
    text: 'Khi bạn xoa hai bàn tay vào nhau, động năng được chuyển hóa thành nhiệt năng.',
    correctAnswer: 'A',
  },
  {
    id: '5',
    text: 'Năng lượng ánh sáng từ mặt trời được thực vật sử dụng để tạo ra thức ăn.',
    correctAnswer: 'A',
  },
  {
    id: '6',
    text: 'Năng lượng có thể tự sinh ra hoặc tự mất đi.',
    correctAnswer: 'B',
  },
  {
    id: '7',
    text: 'Lò nướng bánh mì chuyển hóa điện năng thành nhiệt năng.',
    correctAnswer: 'A',
  },
  {
    id: '8',
    text: 'Thế năng là năng lượng mà một vật có được do vị trí hoặc trạng thái của nó.',
    correctAnswer: 'A',
  },
  {
    id: '9',
    text: 'Năng lượng hạt nhân được giải phóng khi hạt nhân của nguyên tử bị phân hạch hoặc nhiệt hạch.',
    correctAnswer: 'A',
  },
  {
    id: '10',
    text: 'Quạt điện chuyển hóa điện năng thành quang năng (ánh sáng).',
    correctAnswer: 'B',
  },
  {
    id: '11',
    text: 'Năng lượng nhiệt có thể truyền từ vật lạnh sang vật nóng hơn một cách tự phát.',
    correctAnswer: 'B',
  },
  {
    id: '12',
    text: 'Xe đạp đang đứng yên trên đỉnh dốc có thế năng hấp dẫn.',
    correctAnswer: 'A',
  },
  {
    id: '13',
    text: 'Pin mặt trời chuyển hóa quang năng thành điện năng.',
    correctAnswer: 'A',
  },
  {
    id: '14',
    text: 'Tiếng sấm là một dạng năng lượng âm thanh.',
    correctAnswer: 'A',
  },
  {
    id: '15',
    text: 'Khi đèn điện sáng, điện năng chỉ chuyển hóa thành quang năng.',
    correctAnswer: 'B',
  },
];
