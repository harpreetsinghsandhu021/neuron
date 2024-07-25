"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsStripe } from "react-icons/bs";

export default function PaymentGateways() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <BsStripe className="w-10 h-10" /> Stripe
        </CardTitle>
        <CardDescription>
          Stripe is the fastest and easiest way to integrate payments and
          financial services into your software platform or marketplace.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button>Connect</Button>
      </CardFooter>
    </Card>
  );
}
