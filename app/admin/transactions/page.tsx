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
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Trash,
} from "lucide-react";
import { motion } from "framer-motion";
import { DatePicker } from "@/components/ui/datepicker";
import CompetitionFilter from "@/components/ui/competitionsfilter";

export default function AdminTransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [competitionFilter, setCompetitionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(200);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          ...(statusFilter ? { status: statusFilter } : {}),
          ...(competitionFilter ? { competitionId: competitionFilter } : {}),
          ...(dateFilter ? { date: dateFilter.toISOString() } : {}),
          ...(searchTerm ? { search: searchTerm } : {}),
        });

        const res = await fetch(`/api/admin/transactions?${params}`);
        const data = await res.json();
        setTransactions(data.transactions);
        setTotal(data.total); // backend doit renvoyer { transactions, total }
      } catch (err) {
        console.error("Erreur fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
    console.log("📦 Filtre compétition parent:", competitionFilter);
  }, [page, dateFilter, competitionFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteTransaction = async (id: string) => {
    await fetch(`/api/admin/transactions/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteSelected = async () => {
    await fetch(`/api/admin/transactions/bulk-delete`, {
      method: "POST",
      body: JSON.stringify({ ids: selectedIds }),
    });
    setTransactions((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
    setSelectedIds([]);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionRef
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    const matchesCompetition =
      !competitionFilter || transaction.competitionId === competitionFilter;

    const matchesDate =
      !dateFilter ||
      new Date(transaction.createdAt).toDateString() ===
        dateFilter.toDateString();

    return matchesSearch && matchesStatus && matchesDate && matchesCompetition;
  });
  if (loading) {
    return (
      <div className="space-y-6">
        {" "}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />{" "}
        <div className="space-y-4">
          {" "}
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              {" "}
              <CardContent className="p-6">
                {" "}
                <div className="h-16 bg-gray-200 rounded animate-pulse" />{" "}
              </CardContent>{" "}
            </Card>
          ))}{" "}
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {" "}
        <div className="flex items-center justify-between">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-bold text-gray-900">
              Transactions
            </h1>{" "}
            <p className="text-gray-600 mt-1">
              {" "}
              Suivi des paiements automatisés{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex space-x-3">
            {" "}
            <Button variant="outline" className="rounded-xl">
              {" "}
              <Download className="w-4 h-4 mr-2" /> Exporter{" "}
            </Button>{" "}
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => window.location.reload()}
            >
              {" "}
              <RefreshCw className="w-4 h-4 mr-2" /> Actualiser{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
      </motion.div>{" "}
      {/* Stats Cards */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {" "}
        <Card className="rounded-2xl shadow-lg border-0">
          {" "}
          <CardContent className="p-6 text-center">
            {" "}
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />{" "}
            <div className="text-2xl font-bold text-green-600">
              {" "}
              {transactions.length}{" "}
            </div>{" "}
            <div className="text-sm text-gray-600">
              Total transactions filtres
            </div>{" "}
          </CardContent>{" "}
        </Card>{" "}
        <Card className="rounded-2xl shadow-lg border-0">
          {" "}
          <CardContent className="p-6 text-center">
            {" "}
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />{" "}
            <div className="text-2xl font-bold text-orange-600">
              {" "}
              {transactions.filter((t) => t.status === "pending").length}{" "}
            </div>{" "}
            <div className="text-sm text-gray-600">En attente</div>{" "}
          </CardContent>{" "}
        </Card>{" "}
        <Card className="rounded-2xl shadow-lg border-0">
          {" "}
          <CardContent className="p-6 text-center">
            {" "}
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />{" "}
            <div className="text-2xl font-bold text-red-600">
              {" "}
              {transactions.filter((t) => t.status === "rejected").length}{" "}
            </div>{" "}
            <div className="text-sm text-gray-600">Rejetées</div>{" "}
          </CardContent>{" "}
        </Card>{" "}
      </motion.div>
      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>

          {/* filtre date */}
          <DatePicker
            selected={dateFilter}
            onSelect={(date) => setDateFilter(date ?? null)}
          />

          {/* filtre competition */}
          <CompetitionFilter
            competitionFilter={competitionFilter}
            setCompetitionFilter={(competitionId) =>
              setCompetitionFilter(competitionId ?? "")
            }
          />
        </div>

        {selectedIds.length > 0 && (
          <Button
            onClick={deleteSelected}
            variant="destructive"
            className="rounded-xl"
          >
            <Trash className="w-4 h-4 mr-2" /> Supprimer ({selectedIds.length})
          </Button>
        )}
      </div>
      {/* Liste */}
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <Card key={t.id} className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedIds.includes(t.id)}
                  onCheckedChange={() => toggleSelect(t.id)}
                />
                <div>
                  <div className="font-semibold">{t.playerName}</div>
                  <div className="text-sm text-gray-500">{t.amount} FCFA</div>
                </div>
                <div className="text-[14px]">
                  <div className="flex gap-1">
                    <span className="font-bold">Numero :</span>{" "}
                    <span>{t.customerPhone}</span>
                  </div>
                  <div className="flex gap-1 text-gray-500">
                    <span className="font-bold">ID Transaction :</span>{" "}
                    <span className="text-green-800">{t.transactionRef}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div>{new Date(t.createdAt).toDateString()}</div>
                <Badge className="p-2">{t.status}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteTransaction(t.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 border rounded-lg">
            Aucune transaction ne correspond à vos filtres
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          ← Précédent
        </Button>
        <Button
          disabled={page * pageSize >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Suivant →
        </Button>
      </div>
    </div>
  );
}
