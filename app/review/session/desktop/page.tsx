"use client";

import React from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import ProgressRing from "../../../../components/ui/ProgressRing";
import CardFlip from "../../../../components/ui/CardFlip";
import ImportanceBadge from "../../../../components/ui/ImportanceBadge";
import RatingButtonRow from "../../../../components/ui/RatingButtonRow";

export default function ReviewSessionDesktop() {
  return (
    <div className="max-w-6xl mx-auto flex gap-6 items-start">
      <aside className="w-80 space-y-4">
        <Card className="p-4">
          <h4 className="text-sm text-text-secondary">Session</h4>
          <div className="mt-3">
            <div className="text-2xl font-semibold">12</div>
            <div className="text-xs text-text-secondary">cards left</div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-text-secondary">Current Accuracy</div>
            <div className="text-2xl font-semibold text-emerald-600">86%</div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm text-text-secondary">Shortcuts</h4>
          <div className="mt-3 text-sm text-text-secondary">Use 1-4 to rate quickly</div>
        </Card>
      </aside>

      <main className="flex-1">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-semibold">What is the capital of France?</h2>
              <div className="mt-2">
                <ImportanceBadge level="normal" />
              </div>
            </div>

            <ProgressRing progress={60} />
          </div>

          <div className="mt-6">
            <CardFlip
              front={<div className="text-lg">Paris</div>}
              back={<div className="text-lg">Paris — capital city of France</div>}
            />
          </div>

          <div className="mt-6 flex items-center justify-center">
            <RatingButtonRow onRate={(r) => console.log('rated', r)} />
          </div>
        </Card>
      </main>
    </div>
  );
}
