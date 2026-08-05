export function auditLog(event: {
  action: string;
  actorId: number;
  actorRole: string;
  targetType: string;
  targetId: number;
  metadata?: Record<string, unknown>;
}) {
  // In a real application, this might write to a separate audit table,
  // or a logging service like Datadog, CloudWatch, etc.
  // For now, we write to stdout so it gets captured by the deployment platform.
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...event,
  };
  
  console.log(JSON.stringify({ type: 'AUDIT', ...logEntry }));
}
