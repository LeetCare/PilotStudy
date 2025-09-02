import { tool } from "ai";
import { z } from "zod";

// Predefined blood pressure logs for Alice Johnson
export const aliceBPLogs = [
  { bp: "142/85", date: new Date().toLocaleDateString(), time: "9:15 AM" },
  {
    bp: "148/90",
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    time: "11:45 AM",
  },
  {
    bp: "144/87",
    date: new Date(Date.now() - 2 * 86400000).toLocaleDateString(),
    time: "8:30 AM",
  },
  {
    bp: "150/92",
    date: new Date(Date.now() - 3 * 86400000).toLocaleDateString(),
    time: "2:20 PM",
  },
  {
    bp: "146/88",
    date: new Date(Date.now() - 4 * 86400000).toLocaleDateString(),
    time: "4:10 PM",
  },
  {
    bp: "143/86",
    date: new Date(Date.now() - 5 * 86400000).toLocaleDateString(),
    time: "10:45 AM",
  },
  {
    bp: "149/91",
    date: new Date(Date.now() - 6 * 86400000).toLocaleDateString(),
    time: "3:30 PM",
  },
  {
    bp: "145/89",
    date: new Date(Date.now() - 7 * 86400000).toLocaleDateString(),
    time: "12:15 PM",
  },
  {
    bp: "147/90",
    date: new Date(Date.now() - 8 * 86400000).toLocaleDateString(),
    time: "9:00 AM",
  },
  {
    bp: "141/84",
    date: new Date(Date.now() - 9 * 86400000).toLocaleDateString(),
    time: "4:45 PM",
  },
];
// Tool definition for getting blood pressure logs
export const getMyLogBook = tool({
  description:
    "Allows you to pull out your home blood pressure logs and readings from your log book. When you want to show your blood pressure history to the pharmacist, call this tool to grab your log book. When calling the tool, first describe the action of taking out your log book and flipping through the pages. Then display the results in a markdown table with 3 columns: Date, time, Blood Pressure. Wait for the tool to finish executing before responding to the pharmacist.",
  parameters: z.null(),
  execute: async () => {
    return aliceBPLogs.map((log) => ({
      ...log,
      reading: `${log.bp} mmHg`,
    }));
  },
});
