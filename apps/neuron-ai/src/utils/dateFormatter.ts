import moment from "moment";

export default function formatChatTimestamp(timestamp: Date) {
  const now = moment();
  const messageTime = moment(timestamp);

  // Check if the message was sent today
  if (now.isSame(messageTime, "day")) {
    return messageTime.format("h:mm A");
  }

  // Check if the message was sent yesterday
  if (now.subtract(1, "days").isSame(messageTime, "day")) {
    return "Yesterday " + messageTime.format("h:mm A");
  }

  // Check if the message was sent within the last 7 days
  if (now.subtract(6, "days").isBefore(messageTime)) {
    return messageTime.format("dddd h:mm A"); // Example: "Monday 5:45 PM"
  }

  // For messages older than 7 days
  return messageTime.format("MMM Do YYYY, h:mm A"); // Example: "Jul 20th 2023, 5:45 PM"
}
