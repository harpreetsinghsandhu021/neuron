import express from "express";
import WebSocket, { RawData, WebSocketServer } from "ws";
import colors from "colors";
import { UserManager } from "./userManager";
import { incomingMessage, supportedMessage } from "./messages/incomingMessages";
import {
  outgoingMessage,
  supportedMessage as supportedOutgoingMessage,
} from "./messages/outgoingMessages";
import axios from "axios";

// import prisma from "@repo/db/client";

const app = express();

const server = app.listen(8000, () => {
  console.log(colors.green("Info:"), ` Server is running on port 8000`);
});

const wsServer: WebSocketServer = new WebSocketServer({ server: server });

const userManager = new UserManager();

wsServer.on("connection", (ws) => {
  console.log(
    colors.green("Info:"),
    ` WebSocket connection established successfully 🚀`
  );

  ws.on("message", (data: string) => {
    try {
      console.log(JSON.parse(data.toString()));

      messageHandler(ws, JSON.parse(data.toString()));
    } catch (err) {
      console.log(err);
    }
  });
});

async function messageHandler(ws: WebSocket, message: incomingMessage) {
  if (message.type === supportedMessage.getRooms) {
    const tab = message.payload.activeTab;

    const res = await getAllChatRooms(tab);

    wsServer.clients.forEach((client) =>
      client.send(JSON.stringify({ type: "REALTIME_CHATROOMS", payload: res }))
    );
  }

  if (message.type === supportedMessage.joinRoom) {
    const payload = message.payload;
    userManager.addUser(payload.name, payload.userId, payload.roomId, ws);
  }

  if (message.type === supportedMessage.sendMessage) {
    const payload = message.payload;

    const user = userManager.getUser(payload.roomId, payload.userId);

    if (!user) {
      console.error("User not found in the db");
      return;
    }

    const outgoingPayload: outgoingMessage = {
      type: supportedOutgoingMessage.AddChat,
      payload: {
        roomId: payload.roomId,
        message: payload.message,
        name: user.name,
        role: payload.role,
      },
    };

    const res = await createChatMessage(outgoingPayload);

    userManager.broadCast(payload.roomId, payload.userId, {
      type: supportedOutgoingMessage.AddChat,
      payload: { ...res, name: outgoingPayload.payload.name },
    });
  }
}

export async function getAllChatRooms(slug: string | null) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/chatrooms/live?slug=${slug}`
    );

    return res.data;
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}

export async function createChatMessage(payload: outgoingMessage) {
  try {
    const res = await axios.post(`http://localhost:3000/api/chatMessage`, {
      message: payload.payload.message,
      roomId: payload.payload.roomId,
      role: payload.payload.role,
    });

    if (res.status === 201) {
      return res.data;
    }
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}
