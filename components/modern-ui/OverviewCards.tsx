"use client"

import { IconArrowUp, IconCreditCard, IconCurrencyDollar, IconUsers } from "@tabler/icons-react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IconCurrencyDollar className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-green-500">
              <IconArrowUp className="size-4" />
              30%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <IconUsers className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-green-500">
              <IconArrowUp className="size-4" />
              18%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <IconCreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-green-500">
              <IconArrowUp className="size-4" />
              15%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <IconUsers className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-green-500">
              <IconArrowUp className="size-4" />
              20%
            </span>{" "}
            from last hour
          </p>
        </CardContent>
      </Card>
    </div>
  )
}