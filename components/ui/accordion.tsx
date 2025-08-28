"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

type Ctx = {
  type: AccordionType;
  collapsible: boolean;
  open: Set<string>;
  toggle: (val: string) => void;
  isOpen: (val: string) => boolean;
};

const AccordionContext = React.createContext<Ctx | null>(null);

export function Accordion({
  children,
  className,
  type = "multiple",
  collapsible = true,
}: React.HTMLAttributes<HTMLDivElement> & { type?: AccordionType; collapsible?: boolean }) {
  const [open, setOpen] = React.useState<Set<string>>(new Set());
  const toggle = (val: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const has = next.has(val);
      if (type === "single") {
        next.clear();
        if (!has || collapsible) next.add(val);
      } else {
        if (has) next.delete(val);
        else next.add(val);
      }
      return next;
    });
  };
  const isOpen = (val: string) => open.has(val);
  const ctx: Ctx = { type, collapsible, open, toggle, isOpen };
  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn("divide-y divide-white/10 rounded-2xl glass card-shadow", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div data-value={value}>{children}</div>;
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) return null;
  const parent = (props as any)["data-parent"] as string | undefined;
  const value = (props as any)["data-value"] as string | undefined;
  return (
    <AccordionTriggerImpl value={value || parent || ""} className={className}>
      {children}
    </AccordionTriggerImpl>
  );
}

function AccordionTriggerImpl({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(AccordionContext)!;
  const open = ctx.isOpen(value);
  return (
    <button
      onClick={() => ctx.toggle(value)}
      aria-expanded={open}
      className={cn("w-full text-left px-5 py-4 font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-t-lg", className)}
    >
      <span>{children}</span>
      <span aria-hidden className="text-lg">{open ? "−" : "+"}</span>
    </button>
  );
}

export function AccordionContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(AccordionContext)!;
  const parentValue = (props as any)["data-value"] as string | undefined;
  const open = parentValue ? ctx.isOpen(parentValue) : false;
  return (
    <div
      className={cn("px-5 py-4 text-gray-600", open ? "block" : "hidden", className)}
      role="region"
      aria-hidden={!open}
    >
      {children}
    </div>
  );
}