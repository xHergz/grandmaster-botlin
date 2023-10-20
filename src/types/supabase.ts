export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Alert_Recipient: {
        Row: {
          Discord_Guild_Id: string;
          Discord_User_Id: string;
          Monster_Spawn_Id: string;
        };
        Insert: {
          Discord_Guild_Id: string;
          Discord_User_Id: string;
          Monster_Spawn_Id: string;
        };
        Update: {
          Discord_Guild_Id?: string;
          Discord_User_Id?: string;
          Monster_Spawn_Id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Alert_Recipient_Discord_Guild_Id_fkey";
            columns: ["Discord_Guild_Id"];
            referencedRelation: "Discord_Guild";
            referencedColumns: ["Discord_Guild_Id"];
          },
          {
            foreignKeyName: "Alert_Recipient_Discord_User_Id_fkey";
            columns: ["Discord_User_Id"];
            referencedRelation: "Discord_User";
            referencedColumns: ["Discord_User_Id"];
          },
          {
            foreignKeyName: "Alert_Recipient_Monster_Spawn_Id_fkey";
            columns: ["Monster_Spawn_Id"];
            referencedRelation: "Monster_Spawn";
            referencedColumns: ["Monster_Spawn_Id"];
          }
        ];
      };
      Discord_Guild: {
        Row: {
          Discord_Guild_Id: string;
          Name: string | null;
        };
        Insert: {
          Discord_Guild_Id: string;
          Name?: string | null;
        };
        Update: {
          Discord_Guild_Id?: string;
          Name?: string | null;
        };
        Relationships: [];
      };
      Discord_Guild_Membership: {
        Row: {
          Discord_Guild_Id: string;
          Discord_User_Id: string;
        };
        Insert: {
          Discord_Guild_Id: string;
          Discord_User_Id: string;
        };
        Update: {
          Discord_Guild_Id?: string;
          Discord_User_Id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Discord_Guild_Membership_Discord_Guild_Id_fkey";
            columns: ["Discord_Guild_Id"];
            referencedRelation: "Discord_Guild";
            referencedColumns: ["Discord_Guild_Id"];
          },
          {
            foreignKeyName: "Discord_Guild_Membership_Discord_User_Id_fkey";
            columns: ["Discord_User_Id"];
            referencedRelation: "Discord_User";
            referencedColumns: ["Discord_User_Id"];
          }
        ];
      };
      Discord_User: {
        Row: {
          Discord_User_Id: string;
          Name: string;
        };
        Insert: {
          Discord_User_Id: string;
          Name: string;
        };
        Update: {
          Discord_User_Id?: string;
          Name?: string;
        };
        Relationships: [];
      };
      Monster_Spawn: {
        Row: {
          Monster_Spawn_Id: string;
          Name: string;
          Npc_Id: number;
          Seconds_To_Spawn: number;
        };
        Insert: {
          Monster_Spawn_Id: string;
          Name: string;
          Npc_Id: number;
          Seconds_To_Spawn: number;
        };
        Update: {
          Monster_Spawn_Id?: string;
          Name?: string;
          Npc_Id?: number;
          Seconds_To_Spawn?: number;
        };
        Relationships: [];
      };
      Tracked_Spawn: {
        Row: {
          Alerted_At: string | null;
          Discord_Channel_Id: string;
          Discord_Guild_Id: string;
          Discord_User_Id: string;
          Monster_Spawn_Id: string;
          Spawn_Time: string;
          Tracked_Spawn_Id: string;
        };
        Insert: {
          Alerted_At?: string | null;
          Discord_Channel_Id: string;
          Discord_Guild_Id: string;
          Discord_User_Id: string;
          Monster_Spawn_Id: string;
          Spawn_Time: string;
          Tracked_Spawn_Id?: string;
        };
        Update: {
          Alerted_At?: string | null;
          Discord_Channel_Id?: string;
          Discord_Guild_Id?: string;
          Discord_User_Id?: string;
          Monster_Spawn_Id?: string;
          Spawn_Time?: string;
          Tracked_Spawn_Id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Tracked_Spawn_Discord_Guild_Id_fkey";
            columns: ["Discord_Guild_Id"];
            referencedRelation: "Discord_Guild";
            referencedColumns: ["Discord_Guild_Id"];
          },
          {
            foreignKeyName: "Tracked_Spawn_Discord_User_Id_fkey";
            columns: ["Discord_User_Id"];
            referencedRelation: "Discord_User";
            referencedColumns: ["Discord_User_Id"];
          },
          {
            foreignKeyName: "Tracked_Spawn_Monster_Spawn_Id_fkey";
            columns: ["Monster_Spawn_Id"];
            referencedRelation: "Monster_Spawn";
            referencedColumns: ["Monster_Spawn_Id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_spawn_time: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
