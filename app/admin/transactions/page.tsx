"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminTransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/admin/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Erreur fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmé",
          color: "bg-green-500 text-white",
          icon: CheckCircle,
          iconColor: "text-green-500",
        };
      case "pending":
        return {
          label: "En attente",
          color: "bg-orange-500 text-white",
          icon: Clock,
          iconColor: "text-orange-500",
        };
      case "rejected":
        return {
          label: "Rejeté",
          color: "bg-red-500 text-white",
          icon: XCircle,
          iconColor: "text-red-500",
        };
      default:
        return {
          label: "Inconnu",
          color: "bg-gray-500 text-white",
          icon: Clock,
          iconColor: "text-gray-500",
        };
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "callback":
        return "Callback Wave";
      case "user_input":
        return "Saisie utilisateur";
      case "admin":
        return "Validation admin";
      case "api_verification":
        return "API Wave";
      default:
        return source;
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionRef
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    const matchesSource = !sourceFilter || transaction.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleReverifyTransaction = async (transactionId: string) => {
    try {
      await fetch(`/api/admin/transactions/${transactionId}/reverify`, {
        method: "POST",
      });
      // Recharge après re-vérification
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Erreur re-vérification transaction:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">
              Suivi des paiements automatisés
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {transactions.filter((t) => t.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmées</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {transactions.filter((t) => t.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">En attente</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {transactions.filter((t) => t.status === "rejected").length}
            </div>
            <div className="text-sm text-gray-600">Rejetées</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <CreditCard className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">
              {(
                transactions.reduce(
                  (acc, t) => acc + (t.status === "confirmed" ? t.amount : 0),
                  0
                ) / 1000
              ).toFixed(0)}
              K
            </div>
            <div className="text-sm text-gray-600">FCFA confirmés</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sources</SelectItem>
                  <SelectItem value="callback">Callback Wave</SelectItem>
                  <SelectItem value="user_input">Saisie utilisateur</SelectItem>
                  <SelectItem value="admin">Validation admin</SelectItem>
                  <SelectItem value="api_verification">API Wave</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                {filteredTransactions.length} transaction(s)
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredTransactions.map((transaction, index) => {
          const statusConfig = getStatusConfig(transaction.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={transaction._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <StatusIcon
                        className={`w-8 h-8 ${statusConfig.iconColor}`}
                      />

                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-gray-900">
                            {transaction.playerName}
                          </h3>
                          <Badge
                            className={`${statusConfig.color} rounded-full px-3 py-1 text-xs`}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Compétition:</span>{" "}
                            {transaction.competition}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span>{" "}
                            {transaction.amount} FCFA
                          </div>
                          <div>
                            <span className="font-medium">Référence:</span>
                            <code className="ml-1 text-xs bg-gray-100 px-2 py-1 rounded">
                              {transaction.transactionRef}
                            </code>
                          </div>
                          <div>
                            <span className="font-medium">Téléphone:</span>{" "}
                            {transaction.customerPhone}
                          </div>
                          <div>
                            <span className="font-medium">Source:</span>{" "}
                            {getSourceLabel(transaction.source)}
                          </div>
                          <div>
                            <span className="font-medium">Créé:</span>{" "}
                            {new Date(transaction.createdAt).toLocaleString(
                              "fr-FR"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Détails
                      </Button>

                      {transaction.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleReverifyTransaction(transaction._id)
                          }
                          className="rounded-xl text-indigo-600 hover:text-indigo-700 border-indigo-200 hover:border-indigo-300"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Re-vérifier
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
