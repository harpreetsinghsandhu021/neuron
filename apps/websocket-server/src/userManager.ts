import { WebSocket } from "ws";
import { outgoingMessage } from "./messages/outgoingMessages";

interface User {
  name: string;
  id: string;
  connection: WebSocket;
}

interface Room {
  users: User[];
}

export class UserManager {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map<string, Room>();
  }

  addUser(name: string, userId: string, roomId: string, ws: WebSocket) {
    if (!this.rooms.get(roomId)) {
      this.rooms.set(roomId, {
        users: [],
      });
    }

    this.rooms.get(roomId)?.users.push({
      name: name,
      id: userId,
      connection: ws,
    });

    ws.on("close", () => {
      this.removeUser(roomId, userId);
    });
  }

  removeUser(roomId: string, userId: string) {
    const users = this.rooms.get(roomId)?.users;

    if (users) {
      users.filter((user) => user.id !== userId);
    }
  }

  getUser(roomId: string, userId: string) {
    const users = this.rooms.get(roomId)?.users;

    let user = users?.find((user) => user.id === userId);

    return user ?? null;
  }

  broadCast(roomId: string, userId: string, message: outgoingMessage) {
    const user = this.getUser(roomId, userId);

    if (!user) {
      console.error("User not found");
      return;
    }

    const room = this.rooms.get(roomId);

    if (!room) {
      console.error("Room not found");
      return;
    }

    room.users.forEach((user) => {
      // if (user.id === userId) {
      //   return;
      // }
      console.log("outgoing message " + JSON.stringify(message));
      user.connection.send(JSON.stringify(message));
    });
  }
}
