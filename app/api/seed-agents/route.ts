import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const log: string[] = [];
  try {
    // 1. Ensure public/agents directory exists and copy images
    const publicAgentsDir = path.join(process.cwd(), "public", "agents");
    try {
      await fs.mkdir(publicAgentsDir, { recursive: true });
      const brainDir = "C:\\Users\\Mike\\.gemini\\antigravity-ide\\brain\\42cf6225-1f6c-4b6e-9e8a-b9f1a7f72a20";
      const files = await fs.readdir(brainDir);

      const getLatestFile = (prefix: string) => {
        const matching = files
          .filter((f) => f.startsWith(prefix) && f.endsWith(".png"))
          .sort()
          .reverse();
        return matching.length > 0 ? path.join(brainDir, matching[0]) : null;
      };

      const photo1 = getLatestFile("agent_white_bg_1");
      const photo2 = getLatestFile("agent_white_bg_2");
      const photo3 = getLatestFile("agent_white_bg_3");
      const photo4 = getLatestFile("agent_white_bg_4");

      if (photo1) {
        await fs.copyFile(photo1, path.join(publicAgentsDir, "agent1.png"));
        log.push("Copied photo1 -> /agents/agent1.png");
      }
      if (photo2) {
        await fs.copyFile(photo2, path.join(publicAgentsDir, "agent2.png"));
        log.push("Copied photo2 -> /agents/agent2.png");
      }
      if (photo3) {
        await fs.copyFile(photo3, path.join(publicAgentsDir, "agent3.png"));
        log.push("Copied photo3 -> /agents/agent3.png");
      }
      if (photo4) {
        await fs.copyFile(photo4, path.join(publicAgentsDir, "agent4.png"));
        log.push("Copied photo4 -> /agents/agent4.png");
      }
    } catch (imgErr: any) {
      log.push("Image copy note: " + imgErr.message);
    }

    // 2. Define the 4 real Romanian agents
    const romanianAgents = [
      {
        clerkId: "mock_clerk_id_agent1",
        name: "Alexandru Rusu",
        email: "alexandru.rusu@example.md",
        title: "Senior Real Estate Agent, Chișinău",
        phone: "+373 60 123 456",
        avatarUrl: "/agents/agent1.png",
      },
      {
        clerkId: "mock_clerk_id_agent2",
        name: "Maria Ceban",
        email: "maria.ceban@example.md",
        title: "Luxury Property Specialist, Chișinău",
        phone: "+373 69 987 654",
        avatarUrl: "/agents/agent2.png",
      },
      {
        clerkId: "mock_clerk_id_agent3",
        name: "Victor Munteanu",
        email: "victor.munteanu@example.md",
        title: "Investment Consultant, Chișinău",
        phone: "+373 68 234 567",
        avatarUrl: "/agents/agent3.png",
      },
      {
        clerkId: "mock_clerk_id_agent4",
        name: "Elena Rotaru",
        email: "elena.rotaru@example.md",
        title: "Residential Sales Director, Chișinău",
        phone: "+373 67 345 678",
        avatarUrl: "/agents/agent4.png",
      },
    ];

    const targetEmails = romanianAgents.map((a) => a.email);

    // 3. Update any other existing AGENTS to USER role
    await prisma.user.updateMany({
      where: {
        role: "AGENT",
        email: { notIn: targetEmails },
      },
      data: { role: "USER" },
    });

    // 4. Safely create or update each Romanian agent
    const createdAgents = [];
    for (const a of romanianAgents) {
      const existing = await prisma.user.findFirst({
        where: {
          OR: [{ email: a.email }, { clerkId: a.clerkId }],
        },
      });

      if (existing) {
        const updated = await prisma.user.update({
          where: { id: existing.id },
          data: {
            name: a.name,
            email: a.email,
            title: a.title,
            phone: a.phone,
            avatarUrl: a.avatarUrl,
            role: "AGENT",
          },
        });
        createdAgents.push(updated);
        log.push(`Updated agent: ${a.name}`);
      } else {
        const created = await prisma.user.create({
          data: {
            clerkId: a.clerkId,
            email: a.email,
            name: a.name,
            title: a.title,
            phone: a.phone,
            avatarUrl: a.avatarUrl,
            role: "AGENT",
          },
        });
        createdAgents.push(created);
        log.push(`Created agent: ${a.name}`);
      }
    }

    return NextResponse.json({
      success: true,
      log,
      agents: createdAgents,
    });
  } catch (error: any) {
    console.error("Error seeding agents:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
        stack: error?.stack,
        log,
      },
      { status: 200 }
    );
  }
}
