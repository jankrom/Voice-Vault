import requests
import json
import pandas as pd
import matplotlib.pyplot as plt
import time

API_URL = "https://34.28.232.177/interact"
PASSWORD = "password123"
MODEL_NAME = "vicuna:7b"

TEST_CASES = {
    "Music": [
        {
            "input": "Play the song called Test",
            "expected": {"type": "Music", "data": "Test"},
        },
        {"input": "Stop the music", "expected": {"type": "Music", "data": "STOP"}},
        {"input": "Pause this song", "expected": {"type": "Music", "data": "PAUSE"}},
        {
            "input": "Unpause the music",
            "expected": {"type": "Music", "data": "UNPAUSE"},
        },
    ],
    "Alarm": [
        {
            "input": "Set an alarm for 10:30am",
            "expected": {"type": "Alarm", "data": "10:30"},
        },
        {
            "input": "Set an alarm for 7:00pm",
            "expected": {"type": "Alarm", "data": "19:00"},
        },
        {
            "input": "Set an alarm for 8:00",
            "expected": {"type": "Alarm", "data": "08:00"},
        },
        {"input": "Cancel my alarm", "expected": {"type": "Alarm", "data": "CANCEL"}},
    ],
    "LLM": [
        {"input": "Tell me something interesting", "expected": {"type": "LLM"}},
        {"input": "Tell me a joke", "expected": {"type": "LLM"}},
        {"input": "What time is it?", "expected": {"type": "LLM"}},
    ],
}


def test_model_accuracy(test_cases):
    """Test model accuracy with given test cases"""
    results = []
    total_cases = 0
    correct_cases = 0

    for category, cases in test_cases.items():
        category_correct = 0
        for case in cases:
            try:
                all_song_names = ["Shape of You", "Rolling in the Deep", "Test"]
                message = case["input"]
                query = f"['{message}', {all_song_names}]"
                payload = {
                    "message": query,
                    "password": PASSWORD,
                }
                response = requests.get(
                    API_URL,
                    headers={"Content-Type": "application/json"},
                    json=payload,
                    verify=False,
                )

                try:
                    result = response.json()
                    result = json.loads(result)
                except json.JSONDecodeError:
                    print(
                        f"Failed to parse JSON response for {case['input']}: {result}"
                    )
                    result = {"type": "Error", "data": "Invalid JSON response"}

                is_correct = False
                if isinstance(result, dict):
                    is_correct = result.get("type") == case["expected"]["type"] and (
                        case["expected"].get("data") is None
                        or result.get("data") == case["expected"]["data"]
                    )
                    if is_correct:
                        category_correct += 1
                        correct_cases += 1

                results.append(
                    {
                        "category": category,
                        "input": case["input"],
                        "expected": case["expected"],
                        "actual": result,
                        "is_correct": is_correct,
                    }
                )

                total_cases += 1
                time.sleep(0.5)

            except Exception as e:
                print(f"Error testing input {case['input']}: {str(e)}")
                results.append(
                    {
                        "category": category,
                        "input": case["input"],
                        "expected": case["expected"],
                        "actual": None,
                        "is_correct": False,
                    }
                )
                total_cases += 1

    return results, total_cases, correct_cases


def visualize_results(results, total_cases, correct_cases):
    """Create visualizations of the test results"""
    df = pd.DataFrame(results)

    # Calculate overall accuracy
    overall_accuracy = (correct_cases / total_cases) * 100

    # Calculate accuracy by category
    category_accuracy = df.groupby("category")["is_correct"].mean() * 100

    # Create a figure with multiple subplots
    plt.figure(figsize=(15, 10))

    # Set the main title for the entire figure
    plt.suptitle(f"{MODEL_NAME} - Accuracy Analysis", fontsize=16, y=0.95)

    # Plot 1: Overall Accuracy
    plt.subplot(2, 2, 1)
    plt.bar(["Overall Accuracy"], [overall_accuracy], color="skyblue")
    plt.ylim(0, 100)
    plt.title("Overall Model Accuracy")
    plt.ylabel("Accuracy (%)")

    # Plot 2: Category-wise Accuracy
    plt.subplot(2, 2, 2)
    category_accuracy.plot(kind="bar", color="lightgreen")
    plt.title("Accuracy by Category")
    plt.ylabel("Accuracy (%)")
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.savefig(
        f"{MODEL_NAME.lower()}_results.png",
        dpi=300,
        bbox_inches="tight",
    )
    plt.close()


def main():
    print(f"Starting accuracy tests for {MODEL_NAME}...")

    # Run tests
    results, total_cases, correct_cases = test_model_accuracy(TEST_CASES)

    # Calculate and display overall accuracy
    overall_accuracy = (correct_cases / total_cases) * 100
    print(f"\nOverall Accuracy: {overall_accuracy:.2f}%")

    # Create visualizations
    visualize_results(results, total_cases, correct_cases)


if __name__ == "__main__":
    main()
