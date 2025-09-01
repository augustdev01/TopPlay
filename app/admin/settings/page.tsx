'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Save, 
  Globe, 
  CreditCard, 
  Shield,
  Bell,
  Database,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Général
    siteName: 'VoteSport',
    siteDescription: 'Plateforme de vote pour compétitions sportives',
    contactEmail: 'contact@votesport.sn',
    contactPhone: '+221 77 123 45 67',
    
    // Paiement
    defaultVotePrice: 200,
    waveBusinessBaseUrl: 'https://checkout.wave.com/business',
    waveApiKey: '',
    waveWebhookSecret: '',
    
    // Sécurité
    enableRateLimit: true,
    maxVotesPerHour: 10,
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'Site en maintenance. Retour prévu dans quelques minutes.'
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simuler la sauvegarde
    setTimeout(() => {
      setSaving(false);
      // Toast success
    }, 1500);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
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
            <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600 mt-1">Configuration générale de la plateforme</p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
          >
            {saving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Paramètres généraux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Paramètres généraux
              </CardTitle>
              <CardDescription>Configuration de base du site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="siteName">Nom du site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                  className="rounded-xl mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Email de contact</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSetting('contactEmail', e.target.value)}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Téléphone de contact</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => updateSetting('contactPhone', e.target.value)}
                  className="rounded-xl mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Paramètres de paiement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Paiement Wave Business
              </CardTitle>
              <CardDescription>Configuration des paiements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="defaultVotePrice">Prix par vote (FCFA)</Label>
                <Input
                  id="defaultVotePrice"
                  type="number"
                  value={settings.defaultVotePrice}
                  onChange={(e) => updateSetting('defaultVotePrice', parseInt(e.target.value))}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="waveBusinessBaseUrl">URL de base Wave Business</Label>
                <Input
                  id="waveBusinessBaseUrl"
                  value={settings.waveBusinessBaseUrl}
                  onChange={(e) => updateSetting('waveBusinessBaseUrl', e.target.value)}
                  className="rounded-xl mt-1"
                  placeholder="https://checkout.wave.com/business"
                />
              </div>

              <div>
                <Label htmlFor="waveApiKey">Clé API Wave</Label>
                <Input
                  id="waveApiKey"
                  type="password"
                  value={settings.waveApiKey}
                  onChange={(e) => updateSetting('waveApiKey', e.target.value)}
                  className="rounded-xl mt-1"
                  placeholder="sk_live_..."
                />
              </div>

              <div>
                <Label htmlFor="waveWebhookSecret">Secret Webhook Wave</Label>
                <Input
                  id="waveWebhookSecret"
                  type="password"
                  value={settings.waveWebhookSecret}
                  onChange={(e) => updateSetting('waveWebhookSecret', e.target.value)}
                  className="rounded-xl mt-1"
                  placeholder="whsec_..."
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sécurité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sécurité
              </CardTitle>
              <CardDescription>Paramètres de sécurité et limitations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate limiting</Label>
                  <p className="text-sm text-gray-600">Limiter les requêtes par IP</p>
                </div>
                <Switch
                  checked={settings.enableRateLimit}
                  onCheckedChange={(checked) => updateSetting('enableRateLimit', checked)}
                />
              </div>

              <div>
                <Label htmlFor="maxVotesPerHour">Votes max par heure/IP</Label>
                <Input
                  id="maxVotesPerHour"
                  type="number"
                  value={settings.maxVotesPerHour}
                  onChange={(e) => updateSetting('maxVotesPerHour', parseInt(e.target.value))}
                  className="rounded-xl mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Mode maintenance</Label>
                  <p className="text-sm text-gray-600">Désactiver temporairement le site</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                />
              </div>

              {settings.maintenanceMode && (
                <div>
                  <Label htmlFor="maintenanceMessage">Message de maintenance</Label>
                  <Textarea
                    id="maintenanceMessage"
                    value={settings.maintenanceMessage}
                    onChange={(e) => updateSetting('maintenanceMessage', e.target.value)}
                    className="rounded-xl mt-1"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>Alertes et notifications automatiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications email</Label>
                  <p className="text-sm text-gray-600">Recevoir les alertes par email</p>
                </div>
                <Switch
                  checked={settings.enableEmailNotifications}
                  onCheckedChange={(checked) => updateSetting('enableEmailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications SMS</Label>
                  <p className="text-sm text-gray-600">Recevoir les alertes par SMS</p>
                </div>
                <Switch
                  checked={settings.enableSmsNotifications}
                  onCheckedChange={(checked) => updateSetting('enableSmsNotifications', checked)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Types de notifications</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Nouveaux paiements en attente</li>
                      <li>• Transactions suspectes</li>
                      <li>• Erreurs système</li>
                      <li>• Rapports quotidiens</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}