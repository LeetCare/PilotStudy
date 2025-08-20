/**
 * @fileoverview Learning Modules Page for Educational Content Display
 *
 * This file contains the Next.js page component that displays learning modules
 * organized by categories with progress tracking. Users can navigate to this page
 * from the main application interface to access educational modules.
 *
 * @author LeetCare Development Team
 */
"use client";

export interface ProgressData {
  // The module title
  title: string, 
  // The user's percentage progress of the mmodule  completion rounded to the nearest integer
  progress: number,
}

import ModuleList from "@/components/scenarios/module-list";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ModulesPage() {
  
  const router = useRouter();
  const [moduleCategories, setModuleCategories] = useState([
    {
      title: "Fundamentals",
      progress: 0, // Default progress
      modules: [
        {
          title: "Agenda Setting",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/agenda-setting"),
        },
        {
          title: "Empathy Statements",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/empathy-statements"),
        },
        {
          title: "Review",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/review"),
        },
      ],
    },
    {
      title: "Infectious Disease",
      progress: 0, // Default progress
      modules: [
        {
          title: "CAP",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/cap"),
        },
      ],
    },
    {
      title: "Miscellaneous",
      progress: 0, // Default progress
      modules: [
        {
          title: "Journavx",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/journavx"),
        },
        {
          title: "Levothyroxine",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/levothyroxine"),
        },
        {
          title: "Adderall",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/adderall"),
        },
        {
          title: "GLP-1",
          completed: false,
          image: null,
          onClick: () => router.push("/scenario/GLP-1"),
        },
      ],
    },
  ]);

  // Updates the module categories with the progress data from api
  useEffect(() => {
    console.log("Use effect fired")
    async function fetchModuleProgress() {
      try {
        const res = await fetch("/api/module/progress");

        // Redirect to sign-in if the server indicates no user is logged in
        if (res.status === 400) {
          redirect("/sign-in");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch module progress");
        }

        const progressData = await res.json(); // Example: [{ title: "Fundamentals", progress: 50 }, ...]
        console.log(`User's progress data: ${progressData}`)
        // Map progress data to module categories
        const updatedCategories = moduleCategories.map((module) => {
          console.log(`Currently analyzing: ${module.title}`)
          const matchingProgress = progressData.find(
            (progress: ProgressData) => progress.title === module.title,
          );
          return {
            ...module,
            progress: matchingProgress ? matchingProgress.progress : 0,
          };
        });

        setModuleCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching module progress:", error);
      }
    }

    fetchModuleProgress();
  }, []);

  return <ModuleList categories={moduleCategories} />;
}
