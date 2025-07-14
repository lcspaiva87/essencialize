'use client'

import { BarChart3, Eye, EyeOff, Shield, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="flex w-full max-w-4xl flex-col p-7 lg:flex-row ">
        {/* Left Panel - Welcome Section */}

        <div className="relative hidden flex-col justify-center overflow-hidden rounded-s-md bg-gradient-to-br from-emerald-500 to-teal-600 p-12 text-white lg:flex lg:w-1/2">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="mb-4 font-bold text-4xl">
                Bem-vindo ao Essencialize
              </h1>
              <p className="text-emerald-100 text-xl">
                Otimize seus processos de gestão com automação inteligente e
                insights.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-white/20 p-3">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Análise em Tempo Real</h3>
                  <p className="text-emerald-100 text-sm">
                    Monitore suas métricas de negócio e performance em tempo
                    real
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-white/20 p-3">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Colaboração em Equipe</h3>
                  <p className="text-emerald-100 text-sm">
                    Aumente a produtividade com ferramentas de coordenação em
                    equipe
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-white/20 p-3">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Fluxos Automatizados</h3>
                  <p className="text-emerald-100 text-sm">
                    Reduza tarefas manuais com recursos de automação inteligente
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-white/20 p-3">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Segurança Empresarial</h3>
                  <p className="text-emerald-100 text-sm">
                    Seus dados estão protegidos com medidas de segurança líderes
                    do setor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex w-full items-center justify-center rounded-md bg-slate-800 p-8 md:rounded-e-md lg:w-1/2">
          <div className="w-full max-w-md space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-xl bg-emerald-500 p-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="ml-3 font-bold text-2xl text-white">
                  Essencialize
                </span>
              </div>
              <h2 className="mb-2 font-bold text-3xl text-white">
                Fazer Login
              </h2>
              <p className="text-slate-400">Acesse seu painel de gestão</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300" htmlFor="username">
                  Usuário
                </Label>
                <Input
                  className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  id="username"
                  placeholder="Digite seu usuário"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300" htmlFor="password">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    className="border-slate-700 bg-slate-800 pr-10 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                    id="password"
                    placeholder="Digite sua senha"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    className="-translate-y-1/2 absolute top-1/2 right-3 transform text-slate-400 hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={rememberMe}
                    className="border-slate-600 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                    id="remember"
                    onCheckedChange={(checked) =>
                      setRememberMe(
                        checked === 'indeterminate' ? false : checked
                      )
                    }
                  />
                  <Label className="text-slate-300 text-sm" htmlFor="remember">
                    Lembrar de mim
                  </Label>
                </div>
              </div>

              <Button
                className="w-full transform bg-emerald-500 py-3 font-semibold text-white shadow-lg transition-transform hover:translate-y-[-3px] hover:bg-emerald-600 hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                type="submit"
              >
                Entrar
              </Button>

              <div className="text-center">
                <button
                  className="font-medium text-emerald-400 text-sm transition-colors hover:text-emerald-300"
                  type="button"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-slate-500 text-xs">
              Essencialize © 2025 • Plataforma de Sistema de Gestão
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
