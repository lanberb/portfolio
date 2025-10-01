import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";

const VoteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const VoteCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border || "#e0e0e0"};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const VoteButton = styled.button<{ selected?: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary || "#0066cc" : theme.colors.background};
  color: ${({ selected, theme }) =>
    selected ? "#ffffff" : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary || "#0066cc"};
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 1rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary || "#0066cc"};
    color: #ffffff;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 1rem;
  position: relative;

  &::after {
    content: "${({ percentage }) => percentage}%";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    color: #333;
    z-index: 2;
  }
`;

const ProgressFill = styled.div<{ percentage: number; color: string }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background: ${({ color }) => color};
  transition: width 0.5s ease;
`;

const ResultsContainer = styled.div`
  margin-top: 1rem;
`;

const OptionResult = styled.div`
  margin-bottom: 1rem;
`;

interface VoteOption {
  id: string;
  label: string;
  votes: number;
  color: string;
}

interface Poll {
  id: string;
  question: string;
  options: VoteOption[];
}

export const VotePage = () => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "お気に入りのプログラミング言語は？",
      options: [
        { id: "1a", label: "TypeScript", votes: 0, color: "#3178c6" },
        { id: "1b", label: "Python", votes: 0, color: "#3776ab" },
        { id: "1c", label: "Rust", votes: 0, color: "#ce422b" },
        { id: "1d", label: "Go", votes: 0, color: "#00add8" },
      ],
    },
    {
      id: "2",
      question: "好きなフロントエンドフレームワークは？",
      options: [
        { id: "2a", label: "React", votes: 0, color: "#61dafb" },
        { id: "2b", label: "Vue", votes: 0, color: "#42b883" },
        { id: "2c", label: "Angular", votes: 0, color: "#dd0031" },
        { id: "2d", label: "Svelte", votes: 0, color: "#ff3e00" },
      ],
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem("voteData");
    if (savedVotes) {
      try {
        const parsed = JSON.parse(savedVotes);
        setPolls(parsed.polls || polls);
        setHasVoted(parsed.hasVoted || {});
      } catch (e) {
        console.error("Failed to parse saved votes:", e);
      }
    }
  }, []);

  // Save votes to localStorage
  const saveVotes = (newPolls: Poll[], newHasVoted: Record<string, boolean>) => {
    localStorage.setItem(
      "voteData",
      JSON.stringify({ polls: newPolls, hasVoted: newHasVoted })
    );
  };

  const handleVote = (pollId: string) => {
    const optionId = selectedOptions[pollId];
    if (!optionId) return;

    const newPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map((option) =>
            option.id === optionId
              ? { ...option, votes: option.votes + 1 }
              : option
          ),
        };
      }
      return poll;
    });

    const newHasVoted = { ...hasVoted, [pollId]: true };
    setPolls(newPolls);
    setHasVoted(newHasVoted);
    saveVotes(newPolls, newHasVoted);
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((sum, option) => sum + option.votes, 0);
  };

  const getPercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <VoteContainer>
      <Stack gap={2}>
        <Text
          as="h1"
          size="xxl"
          weight="bold"
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          投票システム POC
        </Text>

        {polls.map((poll) => {
          const totalVotes = getTotalVotes(poll);
          const voted = hasVoted[poll.id];

          return (
            <VoteCard key={poll.id}>
              <Text as="h2" size="xl" weight="bold" style={{ marginBottom: "1.5rem" }}>
                {poll.question}
              </Text>

              {!voted ? (
                <>
                  <div style={{ marginBottom: "1rem" }}>
                    {poll.options.map((option) => (
                      <VoteButton
                        key={option.id}
                        selected={selectedOptions[poll.id] === option.id}
                        onClick={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [poll.id]: option.id,
                          })
                        }
                      >
                        {option.label}
                      </VoteButton>
                    ))}
                  </div>
                  <VoteButton
                    onClick={() => handleVote(poll.id)}
                    disabled={!selectedOptions[poll.id]}
                    style={{
                      width: "100%",
                      marginRight: 0,
                      marginTop: "1rem",
                    }}
                  >
                    投票する
                  </VoteButton>
                </>
              ) : (
                <ResultsContainer>
                  <Text size="md" style={{ marginBottom: "1rem" }}>
                    総投票数: {totalVotes}
                  </Text>
                  {poll.options.map((option) => {
                    const percentage = getPercentage(option.votes, totalVotes);
                    return (
                      <OptionResult key={option.id}>
                        <Text size="md" weight="bold" style={{ marginBottom: "0.5rem" }}>
                          {option.label}: {option.votes} 票
                        </Text>
                        <ProgressBar percentage={percentage}>
                          <ProgressFill
                            percentage={percentage}
                            color={option.color}
                          />
                        </ProgressBar>
                      </OptionResult>
                    );
                  })}
                </ResultsContainer>
              )}
            </VoteCard>
          );
        })}
      </Stack>
    </VoteContainer>
  );
};
