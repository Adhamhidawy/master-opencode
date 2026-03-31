export interface Challenge {
  id: string;
  title: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}
