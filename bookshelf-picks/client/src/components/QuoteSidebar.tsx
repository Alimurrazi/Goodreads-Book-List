"use client";

import React from "react";
import { Card, Typography } from "antd";

export default function QuoteSidebar({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <div className="stickySidebar">
      <Card variant="outlined" style={{ borderRadius: 12 }}>
        <blockquote
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          “{quote}”
        </blockquote>
        <Typography.Text
          style={{
            display: "block",
            marginTop: 12,
            textAlign: "right",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          — {author}
        </Typography.Text>
      </Card>
    </div>
  );
}
