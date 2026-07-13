import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  return new Promise((resolve) => {
    exec('git checkout . && git clean -fd', { cwd: process.cwd() }, (error, stdout, stderr) => {
      resolve(NextResponse.json({
        success: !error,
        stdout,
        stderr,
        error: error ? error.message : null
      }));
    });
  });
}
