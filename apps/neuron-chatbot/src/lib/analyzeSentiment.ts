import Sentiment from "sentiment";

export default function analyseSentiment(text: string) {
  const urgencyKeywords = [
    "refund",
    "warranty",
    "return",
    "exchange",
    "configure",
    "integrate",
  ];
  const hasUrgency = urgencyKeywords.some((keyword) => text.includes(keyword));

  if (hasUrgency)
    return {
      res: true,
    };

  const sentiment = new Sentiment();

  var result = sentiment.analyze(text);

  const compoundScore = result.score;
  const res = compoundScore < -0.7 || compoundScore < -0.5;

  return { res };
}
