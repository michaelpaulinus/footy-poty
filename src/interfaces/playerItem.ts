export default interface playerItem {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: {
    games: {
      appearences: number;
    };
    goals: {
      total: number;
      assists: number;
    };
  };
}
