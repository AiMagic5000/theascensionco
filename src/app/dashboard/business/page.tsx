"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Save,
  X,
} from "lucide-react"

// Demo business data
const initialBusinessProfile = {
  companyName: "ABC Buggy Whips Co.",
  dunsNumber: "12-345-6789",
  paydexScore: 72,
  ein: "XX-XXXXXXX",
  stateOfFormation: "New Mexico",
  industry: "Manufacturing",
}

const initialAccounts = [
  {
    id: "1",
    name: "Business Checking",
    type: "business",
    category: "Checking",
    balance: 24500.0,
    institution: "Chase Business",
    accountNumber: "****4521",
  },
  {
    id: "2",
    name: "Business Savings",
    type: "business",
    category: "Savings",
    balance: 15000.0,
    institution: "Chase Business",
    accountNumber: "****4522",
  },
  {
    id: "3",
    name: "Business Credit Card",
    type: "business",
    category: "Credit Card",
    balance: -2500.0,
    institution: "Brex",
    accountNumber: "****7890",
  },
  {
    id: "4",
    name: "Personal Checking",
    type: "personal",
    category: "Checking",
    balance: 8750.0,
    institution: "Wells Fargo",
    accountNumber: "****1234",
  },
  {
    id: "5",
    name: "Personal Savings",
    type: "personal",
    category: "Savings",
    balance: 12000.0,
    institution: "Ally Bank",
    accountNumber: "****5678",
  },
]

type Account = (typeof initialAccounts)[0]

export default function BusinessPage() {
  const [businessProfile, setBusinessProfile] = useState(initialBusinessProfile)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [editingProfile, setEditingProfile] = useState(false)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [editingAccount, setEditingAccount] = useState<string | null>(null)
  const [accountFilter, setAccountFilter] = useState<"all" | "business" | "personal">("all")

  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "business" as "business" | "personal",
    category: "Checking",
    balance: 0,
    institution: "",
    accountNumber: "",
  })

  const filteredAccounts = accounts.filter(
    (a) => accountFilter === "all" || a.type === accountFilter
  )

  const totalBusinessBalance = accounts
    .filter((a) => a.type === "business")
    .reduce((sum, a) => sum + a.balance, 0)

  const totalPersonalBalance = accounts
    .filter((a) => a.type === "personal")
    .reduce((sum, a) => sum + a.balance, 0)

  const handleAddAccount = () => {
    const account: Account = {
      id: Date.now().toString(),
      ...newAccount,
    }
    setAccounts([...accounts, account])
    setNewAccount({
      name: "",
      type: "business",
      category: "Checking",
      balance: 0,
      institution: "",
      accountNumber: "",
    })
    setShowAddAccount(false)
  }

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id))
  }

  const handleUpdateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(accounts.map((a) => (a.id === id ? { ...a, ...updates } : a)))
    setEditingAccount(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Business Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your business profile, accounts, and credit tracking
        </p>
      </div>

      {/* Business Profile */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Profile
            </CardTitle>
            <CardDescription>Your business information and D&B tracking</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingProfile(!editingProfile)}
          >
            {editingProfile ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Company Name
              </label>
              {editingProfile ? (
                <Input
                  value={businessProfile.companyName}
                  onChange={(e) =>
                    setBusinessProfile({ ...businessProfile, companyName: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                  {businessProfile.companyName}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                D&B Number
              </label>
              {editingProfile ? (
                <Input
                  value={businessProfile.dunsNumber}
                  onChange={(e) =>
                    setBusinessProfile({ ...businessProfile, dunsNumber: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                  {businessProfile.dunsNumber}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                PAYDEX Score
              </label>
              {editingProfile ? (
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={businessProfile.paydexScore}
                  onChange={(e) =>
                    setBusinessProfile({
                      ...businessProfile,
                      paydexScore: parseInt(e.target.value),
                    })
                  }
                  className="mt-1"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {businessProfile.paydexScore}
                  </span>
                  <span className="text-sm text-gray-500">/100</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">EIN</label>
              {editingProfile ? (
                <Input
                  value={businessProfile.ein}
                  onChange={(e) =>
                    setBusinessProfile({ ...businessProfile, ein: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                  {businessProfile.ein}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                State of Formation
              </label>
              {editingProfile ? (
                <Input
                  value={businessProfile.stateOfFormation}
                  onChange={(e) =>
                    setBusinessProfile({ ...businessProfile, stateOfFormation: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                  {businessProfile.stateOfFormation}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Industry
              </label>
              {editingProfile ? (
                <Input
                  value={businessProfile.industry}
                  onChange={(e) =>
                    setBusinessProfile({ ...businessProfile, industry: e.target.value })
                  }
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                  {businessProfile.industry}
                </p>
              )}
            </div>
          </div>
          {editingProfile && (
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setEditingProfile(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Balances Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Business Accounts Total</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${totalBusinessBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Personal Accounts Total
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  ${totalPersonalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Accounts
            </CardTitle>
            <CardDescription>Manage your business and personal accounts</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {(["all", "business", "personal"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAccountFilter(filter)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    accountFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowAddAccount(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Account Form */}
          {showAddAccount && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Add New Account</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  placeholder="Account Name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
                <select
                  value={newAccount.type}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      type: e.target.value as "business" | "personal",
                    })
                  }
                  className="h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3"
                >
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                </select>
                <select
                  value={newAccount.category}
                  onChange={(e) => setNewAccount({ ...newAccount, category: e.target.value })}
                  className="h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3"
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Line of Credit">Line of Credit</option>
                </select>
                <Input
                  placeholder="Institution"
                  value={newAccount.institution}
                  onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Balance"
                  value={newAccount.balance || ""}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) || 0 })
                  }
                />
                <Input
                  placeholder="Account Number (last 4)"
                  value={newAccount.accountNumber}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, accountNumber: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddAccount(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAccount}>Add Account</Button>
              </div>
            </div>
          )}

          {/* Accounts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Institution
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {account.accountNumber}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          account.type === "business"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {account.type}
                      </span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {account.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {account.institution}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-medium ${
                          account.balance < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        ${Math.abs(account.balance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                        {account.balance < 0 && " CR"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingAccount(account.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
