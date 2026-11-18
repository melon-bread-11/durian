import { Plus } from "lucide-react";
const questions = [
  [
    "Which variety should I start with?",
    "Start with the flavours you enjoy. Browse the catalogue for a sweeter, balanced, or bittersweet profile, then save a variety to your enquiry list. The tasting notes in this preview are illustrative.",
  ],
  [
    "When is the next harvest?",
    "Durian is seasonal, and timing depends on the orchard and the weather. Confirmed harvest dates and availability will be shared by the farm when they are ready.",
  ],
  [
    "Can I visit the farm?",
    "Visitor dates, access, and arrangements still need to be confirmed. Choose “Farm visit” on the enquiry preview to explore that flow.",
  ],
  [
    "Does an enquiry reserve my durians?",
    "An enquiry starts a conversation. Availability, pricing, and collection arrangements must be confirmed directly with the farm. In this website preview, no enquiry is sent and no stock is reserved.",
  ],
];
export function Faq() {
  return (
    <div className="faq-list">
      {questions.map(([question, answer]) => (
        <details key={question}>
          <summary>
            {question}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
