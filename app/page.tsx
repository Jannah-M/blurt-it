'use client';

import { Box, Heading, Textarea, Button, VStack, Text, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { useState } from 'react';

export default function HomePage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ correct: string[], incorrect: string[] } | null>(null);

  const handleAnalyze = async () => {
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <VStack p={8}>
        <Heading>CS Blurter</Heading>
        <Textarea
          placeholder="Enter a Computer Science Topic:"
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="sm"
        />
        <Textarea
          placeholder="Write everything you know about this topic..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="xl"
        />
        <Button colorScheme="blue" onClick={handleAnalyze}>
          Analyze
        </Button>

        {result && (
          <Box w="full" mt={4}>
            <Text fontWeight="bold">Correct Concepts:</Text>
            <ul>{result.correct.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <Text fontWeight="bold" mt={2}>Needs Review:</Text>
            <ul>{result.incorrect.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Box>
        )}
      </VStack>
    </ChakraProvider>
  );
}
