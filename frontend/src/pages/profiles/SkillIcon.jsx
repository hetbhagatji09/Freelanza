import {
    Code2,
    Server,
    Database,
    Figma,
    BrainCircuit,
    LineChart,
    Palette,
    FileCode,
    Smartphone,
    Cloud,
    Cog,
    Lightbulb,
    GitBranch,
    Blocks,
  } from "lucide-react"
  import { cn } from "@/lib/utils"
  
  export function SkillIcon({ skill, className }) {
    const normalizedSkill = skill.toLowerCase()
  
    // Frontend
    if (normalizedSkill.includes("react") || normalizedSkill.includes("jsx")) {
      return <Code2 className={cn(className, "text-sky-500")} />
    }
    if (normalizedSkill.includes("angular")) {
      return <Code2 className={cn(className, "text-red-500")} />
    }
    if (normalizedSkill.includes("vue")) {
      return <Code2 className={cn(className, "text-emerald-500")} />
    }
    if (normalizedSkill.includes("javascript") || normalizedSkill.includes("js")) {
      return <FileCode className={cn(className, "text-yellow-500")} />
    }
    if (normalizedSkill.includes("typescript") || normalizedSkill.includes("ts")) {
      return <FileCode className={cn(className, "text-blue-500")} />
    }
    if (normalizedSkill.includes("html")) {
      return <Code2 className={cn(className, "text-orange-500")} />
    }
    if (normalizedSkill.includes("css") || normalizedSkill.includes("scss") || normalizedSkill.includes("sass")) {
      return <Palette className={cn(className, "text-blue-400")} />
    }
    if (normalizedSkill.includes("tailwind")) {
      return <Palette className={cn(className, "text-cyan-500")} />
    }
  
    // Backend
    if (normalizedSkill.includes("node") || normalizedSkill.includes("express")) {
      return <Server className={cn(className, "text-green-600")} />
    }
    if (normalizedSkill.includes("python")) {
      return <FileCode className={cn(className, "text-blue-600")} />
    }
    if (normalizedSkill.includes("java")) {
      return <Cog className={cn(className, "text-red-600")} />
    }
    if (normalizedSkill.includes("php")) {
      return <FileCode className={cn(className, "text-indigo-500")} />
    }
    if (normalizedSkill.includes("ruby")) {
      return <FileCode className={cn(className, "text-red-500")} />
    }
    if (normalizedSkill.includes("go") || normalizedSkill.includes("golang")) {
      return <FileCode className={cn(className, "text-cyan-600")} />
    }
  
    // Database
    if (
      normalizedSkill.includes("sql") ||
      normalizedSkill.includes("mysql") ||
      normalizedSkill.includes("postgres") ||
      normalizedSkill.includes("database")
    ) {
      return <Database className={cn(className, "text-blue-600")} />
    }
    if (normalizedSkill.includes("mongo")) {
      return <Database className={cn(className, "text-green-600")} />
    }
    if (normalizedSkill.includes("firebase")) {
      return <Database className={cn(className, "text-amber-500")} />
    }
  
    // Mobile
    if (normalizedSkill.includes("react native") || normalizedSkill.includes("reactnative")) {
      return <Smartphone className={cn(className, "text-blue-500")} />
    }
    if (normalizedSkill.includes("flutter") || normalizedSkill.includes("dart")) {
      return <Smartphone className={cn(className, "text-cyan-500")} />
    }
    if (normalizedSkill.includes("swift") || normalizedSkill.includes("ios")) {
      return <Smartphone className={cn(className, "text-orange-500")} />
    }
    if (normalizedSkill.includes("android") || normalizedSkill.includes("kotlin")) {
      return <Smartphone className={cn(className, "text-green-500")} />
    }
  
    // DevOps & Cloud
    if (normalizedSkill.includes("aws")) {
      return <Cloud className={cn(className, "text-orange-400")} />
    }
    if (normalizedSkill.includes("azure")) {
      return <Cloud className={cn(className, "text-blue-500")} />
    }
    if (normalizedSkill.includes("google cloud") || normalizedSkill.includes("gcp")) {
      return <Cloud className={cn(className, "text-red-400")} />
    }
    if (normalizedSkill.includes("docker")) {
      return <Blocks className={cn(className, "text-blue-500")} />
    }
    if (normalizedSkill.includes("kubernetes") || normalizedSkill.includes("k8s")) {
      return <Blocks className={cn(className, "text-blue-600")} />
    }
  
    // Version Control
    if (normalizedSkill.includes("git")) {
      return <GitBranch className={cn(className, "text-orange-600")} />
    }
  
    // Design
    if (normalizedSkill.includes("ui") || normalizedSkill.includes("ux") || normalizedSkill.includes("design")) {
      return <Figma className={cn(className, "text-purple-500")} />
    }
  
    // AI & Data Science
    if (
      normalizedSkill.includes("ai") ||
      normalizedSkill.includes("machine learning") ||
      normalizedSkill.includes("ml")
    ) {
      return <BrainCircuit className={cn(className, "text-purple-600")} />
    }
    if (normalizedSkill.includes("data") || normalizedSkill.includes("analytics")) {
      return <LineChart className={cn(className, "text-blue-500")} />
    }
  
    // Default icon for other skills
    return <Lightbulb className={cn(className, "text-amber-500")} />
  }
  
  