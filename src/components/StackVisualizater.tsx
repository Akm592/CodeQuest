import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const StackAndQueueVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("stack");

  const push = () => {
    if (inputValue) {
      setStack([...stack, parseInt(inputValue)]);
      setInputValue("");
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1));
    }
  };

  const enqueue = () => {
    if (inputValue) {
      setQueue([...queue, parseInt(inputValue)]);
      setInputValue("");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="container mx-auto p-4 pt-8 md:pt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Stack & Queue</h1>
      <Tabs
        defaultValue="stack"
        className="w-full mb-6"
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger
            value="stack"
            className={`${
              selectedTab === "stack"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground "
            } transition-colors duration-200 `}
          >
            Stack
          </TabsTrigger>
          <TabsTrigger
            value="queue"
            className={`${
              selectedTab === "queue"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            } transition-colors duration-200`}
          >
            Queue
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stack">
          <Card>
            <CardHeader>
              <CardTitle>Stack Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row mb-4">
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  className="mb-2 sm:mb-0 sm:mr-2"
                />
                <Button onClick={push} className="mb-2 sm:mb-0 sm:mr-2">
                  Push
                </Button>
                <Button onClick={pop}>Pop</Button>
              </div>
              <div className="flex flex-col-reverse items-center">
                {stack.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary text-primary-foreground w-20 h-10 flex items-center justify-center m-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Queue Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row mb-4">
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  className="mb-2 sm:mb-0 sm:mr-2"
                />
                <Button onClick={enqueue} className="mb-2 sm:mb-0 sm:mr-2">
                  Enqueue
                </Button>
                <Button onClick={dequeue}>Dequeue</Button>
              </div>
              <div className="flex flex-wrap items-center">
                {queue.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-primary text-primary-foreground w-20 h-10 flex items-center justify-center m-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Structure Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTab === "stack" ? (
            <>
              <h3 className="text-lg font-semibold">Stack</h3>
              <p>
                A stack is a Last-In-First-Out (LIFO) data structure that
                follows the principle of "last in, first out". In a stack,
                elements are added and removed from the same end, typically
                called the "top" of the stack.
              </p>
              <h4 className="font-semibold mt-4">Key Operations:</h4>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Push (Insertion):</strong> O(1) time complexity - Adds
                  an element to the top of the stack.
                </li>
                <li>
                  <strong>Pop (Deletion):</strong> O(1) time complexity -
                  Removes the top element from the stack.
                </li>
                <li>
                  <strong>Peek (Top element):</strong> O(1) time complexity -
                  Returns the top element without removing it.
                </li>
                <li>
                  <strong>IsEmpty:</strong> O(1) time complexity - Checks if the
                  stack is empty.
                </li>
              </ul>
              <h4 className="font-semibold mt-4">Space Complexity:</h4>
              <p>O(n), where n is the number of elements in the stack.</p>
              <h4 className="font-semibold mt-4">Searching in a Stack:</h4>
              <p>
                Searching in a stack is not a typical operation, as it goes
                against the LIFO principle. However, if needed:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Time Complexity:</strong> O(n) in the worst case,
                  where you might need to pop all elements to find the target.
                </li>
                <li>
                  <strong>Process:</strong> You would need to pop elements one
                  by one, check each, and push them onto a temporary stack.
                  After finding the element (or reaching the bottom), you'd need
                  to push all elements back.
                </li>
              </ul>
              <p className="mt-2">
                Due to this inefficiency, if frequent searches are needed,
                consider using a different data structure like an array or
                linked list.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">Queue</h3>
              <p>
                A queue is a First-In-First-Out (FIFO) data structure that
                follows the principle of "first in, first out". In a queue,
                elements are added at one end (rear) and removed from the other
                end (front).
              </p>
              <h4 className="font-semibold mt-4">Key Operations:</h4>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Enqueue (Insertion):</strong> O(1) time complexity -
                  Adds an element to the rear of the queue.
                </li>
                <li>
                  <strong>Dequeue (Deletion):</strong> O(1) time complexity -
                  Removes the element from the front of the queue.
                </li>
                <li>
                  <strong>Front:</strong> O(1) time complexity - Returns the
                  front element without removing it.
                </li>
                <li>
                  <strong>IsEmpty:</strong> O(1) time complexity - Checks if the
                  queue is empty.
                </li>
              </ul>
              <h4 className="font-semibold mt-4">Space Complexity:</h4>
              <p>O(n), where n is the number of elements in the queue.</p>
              <h4 className="font-semibold mt-4">Searching in a Queue:</h4>
              <p>
                Like stacks, searching is not a standard operation for queues,
                but if required:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Time Complexity:</strong> O(n) in the worst case,
                  where you might need to dequeue all elements to find the
                  target.
                </li>
                <li>
                  <strong>Process:</strong> You would need to dequeue elements
                  one by one, check each, and enqueue them to a temporary queue.
                  After finding the element (or reaching the end), you'd need to
                  enqueue all elements back to the original queue.
                </li>
              </ul>
              <p className="mt-2">
                If frequent searches are needed, consider using a more
                appropriate data structure like an array or linked list.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StackAndQueueVisualizer;
