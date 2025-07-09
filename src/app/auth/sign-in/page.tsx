"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, BarChart3, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl p-7 ">
        {/* Left Panel - Welcome Section */}

        <div className="hidden rounded-s-md lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Essencialize</h1>
              <p className="text-xl text-emerald-100">
                Otimize seus processos de gestão com automação inteligente e insights.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Análise em Tempo Real</h3>
                  <p className="text-emerald-100 text-sm">
                    Monitore suas métricas de negócio e performance em tempo real
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Colaboração em Equipe</h3>
                  <p className="text-emerald-100 text-sm">
                    Aumente a produtividade com ferramentas de coordenação em equipe
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Fluxos Automatizados</h3>
                  <p className="text-emerald-100 text-sm">Reduza tarefas manuais com recursos de automação inteligente</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Segurança Empresarial</h3>
                  <p className="text-emerald-100 text-sm">
                    Seus dados estão protegidos com medidas de segurança líderes do setor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-slate-800 flex items-center justify-center p-8 rounded-md  md:rounded-e-md">
          <div className="w-full max-w-md space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-emerald-500 p-3 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold text-white">Essencialize</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Fazer Login</h2>
              <p className="text-slate-400">Acesse seu painel de gestão</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === "indeterminate" ? false : checked)}
                    className="border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Lembrar de mim
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 transition-colors"
              >
                Entrar
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 mt-8">
              Essencialize © 2025 • Plataforma de Sistema de Gestão
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
