'use client';

import { Center, Field, Box, Heading, Textarea, Button, VStack, Text, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { useState } from 'react';
import { theme } from "./theme";

export default function HomePage() 
{
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ correct: string[], incorrect: string[], missing: string[] } | null>(null);

  const handleAnalyze = async () => 
  {
    const res = await fetch('/api/evaluate', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, text }),
    });
    const data = await res.json();
    console.log("API returned:", data);  
    setResult(data);
  };
    
  
  

  return (
    <ChakraProvider value={theme}>
      <VStack p={8}>
        <Heading color={"headerText"} fontFamily={"headingFont"}>BlurtIt!</Heading>
        <Text fontFamily={"headingFont"} textAlign="center">
          Blurting is a study technique
        where you actively retrieve information from memory. To use the 
        blurting method, first review the material you're trying to study.
        Once you feel ready, put away the material. Type out all the information 
        you can remember about the topic below. It doesn't have to be in order, or with perfect
        grammar- just get it onto the screen. Then click Analyze. Our tool will
        identify the concepts you got correct or incorrect, as well as suggest
        further concepts to fill the gaps. After reviewing your
        personalized feedback, study the topic again, 
        paying extra attention to the parts you didn't 
        get the first time. Keep repeating this process until 
        you feel confident in your knowledge!</Text>
        
        <Text fontFamily={"headingFont"} textAlign="center">
          Currently, BlurtIt! is intended for studying topics
          related to computer science to ensure model reliability. Check 
          back to see when new topics will be added.</Text>
        <Field.Root required>
        <Field.Label fontFamily={"headingFont"}>
          Topic:
        </Field.Label> 
        <Textarea fontFamily={"headingFont"}
          placeholder="Ex. 'Variable', 'Linked List', 'Function'"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          size="xl"
        />
        <Field.ErrorText>Field is required</Field.ErrorText>
        
        <Field.Label fontFamily={"headingFont"}>
          Blurt it out!
        </Field.Label>
        <Textarea fontFamily={"headingFont"}
          placeholder="Write out everything you know about this topic..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="xl"
        />
        <Field.ErrorText>Field is required</Field.ErrorText>

        </Field.Root>
        <Button onClick={handleAnalyze} fontFamily={"headingFont"}
        bg={"headerText"} size={"lg"} p={19}>
          Analyze
        </Button>

        {result && (
          <Box w="full" mt={4}>
            <Text fontWeight="bold" fontFamily={"headingFont"}>Correct Concepts:</Text>
            <ul>{result.correct?.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <Text fontWeight="bold" fontFamily={"headingFont"} mt={2}>Needs Review:</Text>
            <ul>{result.incorrect?.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <Text fontWeight="bold" fontFamily={"headingFont"} mt={2}>Potential Details to Add:</Text>
            <ul>{result.missing?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Box>
        )}
      </VStack>
    </ChakraProvider>
  );
}
