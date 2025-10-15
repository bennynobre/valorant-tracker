export interface PlayerStats {
  name: string;
  tag: string;
  team: 'Red' | 'Blue';
  character: string;
  stats?: { 
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
  };
  damage_made: number;
  damage_received: number;
}

export interface Match {
  metadata: {
    matchid: string;
    map: string;
    mode: string;
    rounds_played: number;
  };
  players: {
    all_players: PlayerStats[];
  };
  teams: {
    red: { has_won: boolean | null; rounds_won: number };
    blue: { has_won: boolean | null; rounds_won: number };
  };
}

export interface CharacterData {
  iconUrl: string;
}

export interface MapData {
  imageUrl: string;
}