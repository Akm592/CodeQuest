import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveLeftIcon } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HomePage from "./components/HomePage";
import LongestSubarraySumKVisualizer from "./components/LongestSubarraySumKVisualizer";
import SpiralMatrixAnimation from "./components/SpiralAnimation";
import RotateImageVisualizer from "./components/RotateImageVisualizer";
import BinaryTreeTraversalVisualizer from "./components/BinaryTreeTraversalVisualizer";
import SortingAlgorithmVisualizer from "./components/SortingAlgorithmVisualizer";
import BinarySearchVisualizer from "./components/BinarySearchVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import StackAndQueueVisualizer from "./components/StackVisualizater";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("currentView") || "home";
  });

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);
 

    const renderView = () => {
      switch (currentView) {
        case "longestSubarray":
          return <LongestSubarraySumKVisualizer />;
        case "spiralMatrix":
          return <SpiralMatrixAnimation />;
        case "rotateImage":
          return <RotateImageVisualizer />;
        case "binaryTree":
          return <BinaryTreeTraversalVisualizer />;
        case "sortingAlgorithms":
          return <SortingAlgorithmVisualizer />;
        case "binarySearch":
          return <BinarySearchVisualizer />;
        case "linkedList":
          return <LinkedListVisualizer />;
        case "stack":
          return <StackAndQueueVisualizer />;
        default:
          return <HomePage onSelectVisualization={setCurrentView} />;
      }
    };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <Helmet>
          <meta
            name="google-site-verification"
            content="1UpHMajCLJISBerWywJuL9Qa6Lux3RHXe3k6IBrmVNY"
          />
        </Helmet>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
        {currentView !== "home" && (
          <motion.button
            className="fixed top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 flex items-center space-x-2 shadow-md"
            onClick={() => setCurrentView("home")}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <MoveLeftIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </motion.button>
        )}
        <Analytics />
      </div>
    </HelmetProvider>
  );
}

export default App;
