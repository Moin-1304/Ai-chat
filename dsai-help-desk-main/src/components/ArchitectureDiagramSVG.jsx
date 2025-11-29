import React from 'react';
import { Box, Typography } from '@mui/material';

const ArrowDefs = () => (
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#D4AF37" />
    </marker>
  </defs>
);

const Label = ({ x, y, text, color = '#E0E0E0', fontSize = 12, weight = 'bold' }) => (
  <text x={x} y={y} fill={color} fontSize={fontSize} fontWeight={weight} fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
    {text}
  </text>
);

// Simple word-wrapping label for fixed-width boxes
const WrapLabel = ({ x, y, text, maxWidth, lineHeight = 14, color = '#E0E0E0', fontSize = 11, weight = 'bold' }) => {
  const words = String(text).split(' ');
  const lines = [];
  let current = '';
  const maxChars = Math.max(8, Math.floor(maxWidth / (fontSize * 0.6)));
  words.forEach((w) => {
    const tentative = current ? `${current} ${w}` : w;
    if (tentative.length > maxChars) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = tentative;
    }
  });
  if (current) lines.push(current);
  return (
    <text x={x} y={y} fill={color} fontSize={fontSize} fontWeight={weight} fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lineHeight}>{line}</tspan>
      ))}
    </text>
  );
};

const Rect = ({ x, y, w, h, stroke = '#333333', fill = '#242424', radius = 6, strokeWidth = 2 }) => {
  try { console.log(`RECT x=${x} y=${y} w=${w} h=${h} stroke=${stroke} fill=${fill}`); } catch {}
  return (
    <rect x={x} y={y} width={w} height={h} rx={radius} ry={radius} stroke={stroke} fill={fill} strokeWidth={strokeWidth} />
  );
};

const ArchitectureDiagramSVG = () => {
  // Canvas
  const W = 1400;
  const H = 900;

  // Colors
  const gold = '#D4AF37';
  const green = '#4A7C59';
  const blue = '#2196F3';
  const grayD = '#1a1a1a';
  const gray = '#242424';
  const border = '#333333';

  // Layout coordinates
  const cp = { x: 220, y: 60, w: 1000, h: 720 }; // Control Plane
  const ep = { x: 1240, y: 60, w: 120, h: 720 }; // Event Plane
  const users = { x: 20, y: 120, w: 180, h: 180 };

  const access = { x: cp.x + 20, y: cp.y + 20, w: cp.w - 40, h: 90 };
  const app = { x: cp.x + 20, y: access.y + access.h + 20, w: cp.w - 40, h: 260 };
  const data = { x: cp.x + 20, y: app.y + app.h + 20, w: cp.w - 40, h: 150 };
  const observ = { x: cp.x + 20, y: data.y + data.h + 20, w: cp.w - 40, h: 90 };

  // App layer sub-boxes (row)
  const col = (i) => app.x + 20 + i * 230;
  const row = (j) => app.y + 40 + j * 120;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: gold, fontWeight: 'bold', mb: 1 }}>PCTE AI Help Desk — Architecture (SVG)</Typography>
      <Typography variant="body2" sx={{ color: '#999999', mb: 2 }}>Programmatic layout, no libraries. Boxes and arrows only.</Typography>
      <Box sx={{ bgcolor: grayD, border: `1px solid ${border}`, borderRadius: '8px' }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <ArrowDefs />

          {/* Background */}
          <Rect x={0} y={0} w={W} h={H} stroke={border} fill={grayD} radius={8} />

          {/* Users (left) */}
          <Rect x={users.x} y={users.y} w={users.w} h={users.h} stroke="none" fill={blue} />
          <Label x={users.x + 12} y={users.y + 22} text="Users & Roles" color="#121212" />
          <Label x={users.x + 16} y={users.y + 50} text="Operators" color="#121212" />
          <Label x={users.x + 16} y={users.y + 72} text="Managers" color="#121212" />
          <Label x={users.x + 16} y={users.y + 94} text="Admins" color="#121212" />
          {/* Users → CP Arrow */}
          <line x1={users.x + users.w} y1={users.y + users.h / 2} x2={cp.x} y2={cp.y + 65} stroke={gold} strokeWidth={2} markerEnd="url(#arrow)" />

          {/* CP boundary */}
          <Rect x={cp.x} y={cp.y} w={cp.w} h={cp.h} stroke="none" fill="#121212" radius={10} />
          <Label x={cp.x + 12} y={cp.y - 8} text="Control Plane (CP) — No Internet Egress" color={gold} />

          {/* EP boundary */}
          <Rect x={ep.x} y={ep.y} w={ep.w} h={ep.h} stroke="none" fill="#0D47A1" radius={10} />
          <Label x={ep.x + 10} y={ep.y - 8} text="Event Plane (EP)" color="#E0E0E0" />
          <Label x={ep.x + 14} y={ep.y + 32} text="Ranges / VMs" color="#E0E0E0" fontSize={11} />
          <Label x={ep.x + 14} y={ep.y + 52} text="No public internet" color="#E0E0E0" fontSize={11} />

          {/* Access & Identity */}
          <Rect x={access.x} y={access.y} w={access.w} h={access.h} stroke="none" fill={gray} />
          <Label x={access.x + 12} y={access.y + 22} text="Access & Identity" color={gold} fontSize={14} />
          <Rect x={access.x + 16} y={access.y + 36} w={220} h={38} stroke="none" fill={blue} />
          <Label x={access.x + 28} y={access.y + 60} text="Reverse Proxy (mTLS, OIDC)" color="#121212" />
          <Rect x={access.x + 256} y={access.y + 36} w={180} h={38} stroke="none" fill={green} />
          <Label x={access.x + 268} y={access.y + 60} text="Red Hat SSO / IDM" color="#FFFFFF" />
          <Rect x={access.x + 456} y={access.y + 36} w={200} h={38} stroke="none" fill={gold} />
          <Label x={access.x + 468} y={access.y + 60} text="RBAC Policy Store" color="#121212" />

          {/* App & Services */}
          <Rect x={app.x} y={app.y} w={app.w} h={app.h} stroke="none" fill={gray} />
          <Label x={app.x + 12} y={app.y + 22} text="Application & Services" color={gold} fontSize={14} />
          {/* Row 1 */}
          <Rect x={col(0)} y={row(0)} w={170} h={80} stroke="none" fill={blue} />
          <Label x={col(0) + 12} y={row(0) + 24} text="Self-Service UI" color="#121212" />
          <Label x={col(0) + 12} y={row(0) + 44} text="(Help Desk)" color="#121212" fontSize={11} />

          <Rect x={col(1)} y={row(0)} w={170} h={80} stroke="none" fill={green} />
          <Label x={col(1) + 12} y={row(0) + 24} text="RAG Orchestrator" color="#FFFFFF" />
          <Label x={col(1) + 12} y={row(0) + 44} text="(tools, prompts, guardrails)" color="#FFFFFF" fontSize={11} />

          <Rect x={col(2)} y={row(0)} w={170} h={80} stroke="none" fill={gold} />
          <Label x={col(2) + 12} y={row(0) + 24} text="LLM Inference" color="#121212" />
          <Label x={col(2) + 12} y={row(0) + 44} text="llama.cpp / vLLM" color="#121212" fontSize={11} />

          <Rect x={col(3)} y={row(0)} w={170} h={80} stroke="none" fill={green} />
          <Label x={col(3) + 12} y={row(0) + 24} text="Embeddings Service" color="#FFFFFF" />
          <Label x={col(3) + 12} y={row(0) + 44} text="bge-small / e5-small" color="#FFFFFF" fontSize={11} />

          {/* Row 2 */}
          <Rect x={col(0)} y={row(1)} w={170} h={80} stroke="none" fill={blue} />
          <Label x={col(0) + 12} y={row(1) + 24} text="Connectors" color="#121212" />
          <WrapLabel x={col(0) + 12} y={row(1) + 44} text="Jira, Confluence, MKDocs, Mattermost" maxWidth={146} color="#121212" fontSize={11} />

          <Rect x={col(1)} y={row(1)} w={170} h={80} stroke="none" fill={gold} />
          <Label x={col(1) + 12} y={row(1) + 24} text="Admin Console" color="#121212" />
          <Label x={col(1) + 12} y={row(1) + 44} text="KB curation, config" color="#121212" fontSize={11} />

          {/* Arrows in App */}
          <line x1={col(0) + 170} y1={row(0) + 40} x2={col(1) - 12} y2={row(0) + 40} stroke={gold} strokeWidth={2} markerEnd="url(#arrow)" />
          <line x1={col(1) + 170} y1={row(0) + 40} x2={col(2) - 12} y2={row(0) + 40} stroke={gold} strokeWidth={2} markerEnd="url(#arrow)" />
          <line x1={col(1) + 85} y1={row(0) + 80} x2={col(1) + 85} y2={row(1)} stroke={gold} strokeWidth={2} markerEnd="url(#arrow)" />
          <path d={`M ${col(1) + 85} ${row(0) + 84} Q ${(col(1) + col(3)) / 2 + 85} ${row(0) + 110}, ${col(3) + 85 - 12} ${row(0) + 84}`} stroke={gold} strokeWidth={2} fill="none" markerEnd="url(#arrow)" />

          {/* Data & Storage */}
          <Rect x={data.x} y={data.y} w={data.w} h={data.h} stroke="none" fill={gray} />
          <Label x={data.x + 12} y={data.y + 22} text="Data & Storage" color={gold} fontSize={14} />

          <Rect x={data.x + 20} y={data.y + 40} w={220} h={60} stroke="none" fill={blue} />
          <Label x={data.x + 32} y={data.y + 66} text="Vector DB (pgvector/Milvus)" color="#121212" />

          <Rect x={data.x + 260} y={data.y + 40} w={200} h={60} stroke="none" fill={green} />
          <Label x={data.x + 272} y={data.y + 66} text="PostgreSQL (metadata)" color="#FFFFFF" />

          <Rect x={data.x + 480} y={data.y + 40} w={200} h={60} stroke="none" fill={gold} />
          <Label x={data.x + 492} y={data.y + 66} text="Audit Logs (append-only)" color="#121212" />

          <Rect x={data.x + 700} y={data.y + 40} w={200} h={60} stroke="none" fill={gold} />
          <Label x={data.x + 712} y={data.y + 66} text="Artifacts (models)" color="#121212" />

          {/* App ↔ Data arrows (curved for longer connections) */}
          <path d={`M ${col(2) + 85} ${row(0) + 80} Q ${col(2) + 85} ${row(0) + 140}, ${data.x + 800} ${data.y + 40}`} stroke={gold} strokeWidth={2} fill="none" markerEnd="url(#arrow)" />
          <path d={`M ${col(1) + 85} ${row(0) + 80} Q ${(col(1) + 85 + data.x + 130) / 2} ${row(0) + 140}, ${data.x + 130} ${data.y + 40}`} stroke={gold} strokeWidth={2} fill="none" markerEnd="url(#arrow)" />
          <path d={`M ${col(1) + 85} ${row(0) + 80} Q ${(col(1) + 85 + data.x + 580) / 2} ${row(0) + 150}, ${data.x + 580} ${data.y + 40}`} stroke={gold} strokeWidth={2} fill="none" markerEnd="url(#arrow)" />

          {/* Observability & Security */}
          <Rect x={observ.x} y={observ.y} w={observ.w} h={observ.h} stroke="none" fill={gray} />
          <Label x={observ.x + 12} y={observ.y + 22} text="Observability & Security" color={gold} fontSize={14} />

          <Rect x={observ.x + 16} y={observ.y + 36} w={200} h={38} stroke="none" fill={green} />
          <Label x={observ.x + 28} y={observ.y + 60} text="Prometheus / Grafana" color="#FFFFFF" />

          <Rect x={observ.x + 236} y={observ.y + 36} w={200} h={38} stroke="none" fill={blue} />
          <Label x={observ.x + 248} y={observ.y + 60} text="Loki / ELK (logs)" color="#121212" />

          <Rect x={observ.x + 456} y={observ.y + 36} w={200} h={38} stroke="none" fill={blue} />
          <Label x={observ.x + 468} y={observ.y + 60} text="OpenTelemetry (traces)" color="#121212" />

          <Rect x={observ.x + 676} y={observ.y + 36} w={200} h={38} stroke="none" fill={gold} />
          <Label x={observ.x + 688} y={observ.y + 60} text="Guardrails / SIEM" color="#121212" />

          {/* Legend (color logic) - below CP, bottom-left */}
          <Rect x={cp.x} y={cp.y + cp.h + 10} w={300} h={90} stroke="none" fill="#1e1e1e" />
          <Label x={cp.x + 10} y={cp.y + cp.h + 26} text="Legend" color="#FFFFFF" />
          <Rect x={cp.x + 10} y={cp.y + cp.h + 34} w={14} h={14} stroke="none" fill={blue} />
          <Label x={cp.x + 32} y={cp.y + cp.h + 45} text="Interfaces & I/O" color="#FFFFFF" fontSize={11} />
          <Rect x={cp.x + 10} y={cp.y + cp.h + 56} w={14} h={14} stroke="none" fill={green} />
          <Label x={cp.x + 32} y={cp.y + cp.h + 67} text="Services & Data" color="#FFFFFF" fontSize={11} />
          <Rect x={cp.x + 10} y={cp.y + cp.h + 78} w={14} h={14} stroke="none" fill={gold} />
          <Label x={cp.x + 32} y={cp.y + cp.h + 89} text="Security & Stores" color="#FFFFFF" fontSize={11} />

          {/* No Internet Egress badges */}
          <Label x={cp.x + cp.w - 280} y={cp.y + 18} text="No Internet Egress — Local Inference Only" color={gold} />
        </svg>
      </Box>
    </Box>
  );
};

export default ArchitectureDiagramSVG;
