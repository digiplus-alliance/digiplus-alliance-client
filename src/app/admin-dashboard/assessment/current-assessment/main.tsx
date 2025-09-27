import WelcomePageQuestion from "../widgets/welcome-screen";

export default function CurrentAssessment() {
  return (
    <div>
      <WelcomePageQuestion
        onSubmit={(data) => {
          console.log("Received form data:", data);
        }}
      />
    </div>
  );
}
