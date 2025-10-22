import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Calculator, 
  DollarSign, 
  Zap, 
  Shield, 
  Clock, 
  TrendingUp, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Info,
  Target,
  BarChart3,
  Coffee
} from 'lucide-react'

const CorrectedCostCalculator = ({ selectedPlug, onCostCalculated }) => {
  const [plugType, setPlugType] = useState('medium')
  const [securityTier, setSecurityTier] = useState('medium')
  const [llmModel, setLlmModel] = useState('deepseek-r2')
  const [subscriptionTier, setSubscriptionTier] = useState('lite')
  const [buildTokens, setBuildTokens] = useState(110000)
  const [monthlyTokens, setMonthlyTokens] = useState(140000)
  const [computeMinutes, setComputeMinutes] = useState(30)
  const [apiCalls, setApiCalls] = useState(100)
  const [costBreakdown, setCostBreakdown] = useState(null)

  // Correct LLM Pricing (per 1M tokens) - July 2025
  const llmPricing = {
    'deepseek-r2': { 
      input: 0.27, 
      output: 1.10, 
      name: 'DeepSeek R2', 
      tier: 'Cost Effective',
      description: 'Most cost-effective option, recommended for most use cases'
    },
    'gpt-4o': { 
      input: 5.00, 
      output: 15.00, 
      name: 'GPT-4o', 
      tier: 'Standard',
      description: 'Advanced reasoning and complex task handling'
    },
    'claude-opus': { 
      input: 6.00, 
      output: 18.00, 
      name: 'Claude Opus', 
      tier: 'Premium',
      description: 'Highest quality for complex analysis and creative tasks'
    },
    'grok-4': { 
      input: 8.00, 
      output: 24.00, 
      name: 'GROK-4', 
      tier: 'Premium',
      description: 'Latest X.AI model with real-time data and advanced reasoning'
    },
    'gemini-pro': { 
      input: 1.25, 
      output: 10.00, 
      name: 'Gemini 2.5 Pro MCP', 
      tier: 'Standard',
      description: 'Multimodal capabilities with MCP integration'
    },
    'perplexity-sonar': { 
      input: 1.00, 
      output: 3.00, 
      name: 'Perplexity Sonar', 
      tier: 'Research',
      description: 'Real-time search and research capabilities'
    },
    'perplexity-agent': { 
      input: 1.50, 
      output: 4.00, 
      name: 'Perplexity Agent', 
      tier: 'Agentic',
      description: 'Chart/site builder and advanced data tasks'
    },
    'boost-space': { 
      input: 0.50, 
      output: 2.00, 
      name: 'Boost.Space MCP', 
      tier: 'Integration',
      description: 'Multi-app federated search and actions'
    }
  }

  // Correct Security Tiers with multipliers
  const securityTiers = {
    'light': { 
      multiplier: 1.00, 
      name: 'Light Security',
      description: 'AES-128, VirusTotal scan',
      requirements: [
        'AES-128 encryption',
        'VirusTotal hash/file/URL scan',
        'Basic authentication',
        'Standard TLS'
      ],
      compliance: ['Basic data protection'],
      setupFee: 0
    },
    'medium': { 
      multiplier: 1.10, 
      name: 'Medium Security',
      description: 'AES-256, VT, Splunk alert',
      requirements: [
        'AES-256 encryption',
        'VirusTotal scan + Splunk alerts',
        'Enhanced authentication',
        'Audit logging'
      ],
      compliance: ['GDPR basic compliance'],
      setupFee: 0
    },
    'heavy': { 
      multiplier: 1.15, 
      name: 'Heavy Security',
      description: 'OPA/Gatekeeper, RBAC, signed images',
      requirements: [
        'Open Policy Agent (OPA)',
        'Gatekeeper admission control',
        'RBAC implementation',
        'Signed container images',
        'Namespace isolation'
      ],
      compliance: ['SOC 2 Type I', 'Basic HIPAA'],
      setupFee: 0
    },
    'superior': { 
      multiplier: 1.30, 
      name: 'Superior Security',
      description: 'SIEM/Splunk, FIPS TLS, ACP record, SBOM/Audit',
      requirements: [
        'SIEM/Splunk integration',
        'FIPS TLS libraries',
        'ACP (Agentic Communication Protocol) recording',
        'SBOM (Software Bill of Materials)',
        'Full audit trails'
      ],
      compliance: ['SOC 2 Type II', 'HIPAA', 'PCI DSS'],
      setupFee: 150
    },
    'defense-grade': { 
      multiplier: 1.45, 
      name: 'Defense-Grade Security',
      description: 'FedRAMP mapping, egress deny-all, artifact signature',
      requirements: [
        'FedRAMP compliance mapping',
        'Egress deny-by-default',
        'Artifact signature verification',
        'Enhanced ACP/INTENT/RESULT chain',
        'Zero-trust architecture'
      ],
      compliance: ['FedRAMP', 'DoD standards', 'FIPS 140-2'],
      setupFee: 300
    }
  }

  // Correct Subscription Tiers - Updated July 2025
  const subscriptionTiers = {
    'coffee': {
      name: 'Buy Me A Coffee ☕️',
      price: 7,
      tokens: 50000,
      overage: 0.08,
      setupFee: 0,
      description: 'Demo/try tier - no advanced plugs allowed',
      features: [
        '50,000 tokens monthly',
        '1-2 sample/basic plugs only',
        'Pay-per-use after token exhaustion',
        'Community support',
        'Basic tool access'
      ],
      limits: {
        plugs: '1-2 basic only',
        support: 'Community',
        advanced: false
      }
    },
    'lite': {
      name: 'LITE',
      price: 19,
      tokens: 250000,
      overage: 0.07,
      setupFee: 0,
      description: 'Basic automation - cannot build plugs above allocated tokens',
      features: [
        '250,000 tokens monthly',
        '1-2 Lite plugs per month',
        'Basic automation capabilities',
        'Standard support',
        'Core tool access'
      ],
      limits: {
        plugs: '1-2 Lite plugs/month',
        support: 'Standard',
        advanced: false
      }
    },
    'medium': {
      name: 'MEDIUM',
      price: 59,
      tokens: 600000,
      overage: 0.06,
      setupFee: 0,
      description: 'Ideal for independent podcasters, freelancers',
      features: [
        '600,000 tokens monthly',
        'Modest complexity plugs',
        'Enhanced automation',
        'Priority support',
        'Extended tool access'
      ],
      limits: {
        plugs: 'Modest complexity',
        support: 'Priority',
        advanced: true
      }
    },
    'heavy': {
      name: 'HEAVY',
      price: 149,
      tokens: 1500000,
      overage: 0.05,
      setupFee: 0,
      description: 'Enable large or high-frequency automations',
      features: [
        '1,500,000 tokens monthly',
        'Advanced/enterprise plugs',
        'High-frequency automation',
        'Dedicated support',
        'Full tool access'
      ],
      limits: {
        plugs: 'Advanced/enterprise',
        support: 'Dedicated',
        advanced: true
      }
    },
    'superior': {
      name: 'SUPERIOR (with GROK-4)',
      price: 150,
      tokens: 3000000,
      overage: 0.03,
      setupFee: 150,
      description: 'Digital orgs/twins only - requires consultation',
      features: [
        '3,000,000+ tokens monthly',
        'Digital twin org concierge launch',
        'Requires consultation',
        'Maintenance fees apply',
        'Premium tool access',
        'White-label options'
      ],
      limits: {
        plugs: 'Digital orgs/twins only',
        support: 'Concierge',
        advanced: true
      }
    }
  }

  // Updated Plug Types with correct specifications
  const plugTypes = {
    'lite': { 
      name: 'Lite Plug', 
      baseTokens: 110000, 
      baseApi: 10, 
      baseCompute: 5,
      description: 'Basic automation and simple workflows',
      examples: [
        'Data entry automation',
        'Basic report generation', 
        'Simple notifications',
        'Email automation'
      ],
      tools: ['DeepSeek R2', 'Basic APIs', 'Core automation'],
      deliveryTime: '2-4 hours',
      complexity: 'Basic'
    },
    'medium': { 
      name: 'Medium Plug', 
      baseTokens: 350000, 
      baseApi: 100, 
      baseCompute: 30,
      description: 'Modest complexity business logic and integrations',
      examples: [
        'Content generation systems',
        'Multi-step workflows', 
        'API integrations',
        'Business process automation'
      ],
      tools: ['GPT-4o', 'Perplexity', 'Enhanced APIs'],
      deliveryTime: '4-8 hours',
      complexity: 'Modest'
    },
    'heavy': { 
      name: 'Heavy Plug', 
      baseTokens: 1200000, 
      baseApi: 500, 
      baseCompute: 180,
      description: 'Advanced/enterprise automation with extensive processing',
      examples: [
        'Sports analytics dashboard',
        'Complex data analysis platforms',
        'Multi-agent coordination systems',
        'Enterprise workflow automation'
      ],
      tools: ['Full LLM suite', 'Perplexity Agent', 'Comprehensive APIs'],
      deliveryTime: '8-25 hours',
      complexity: 'Advanced/Enterprise'
    }
  }

  // Calculate costs with correct logic (30% markup + 15% buffer)
  const calculateCosts = () => {
    const selectedPlugData = plugTypes[plugType]
    const selectedSecurity = securityTiers[securityTier]
    const selectedLLM = llmPricing[llmModel]
    const selectedSubscription = subscriptionTiers[subscriptionTier]

    // Base token cost calculation (per 1M tokens)
    const tokenCost = (buildTokens / 1000000) * (selectedLLM.input + selectedLLM.output)
    
    // API cost calculation ($0.01 per call average)
    const apiCost = apiCalls * 0.01
    
    // Compute cost calculation ($0.008 per minute as per spec)
    const computeCost = computeMinutes * 0.008
    
    // Base total before security multiplier
    const baseTotal = tokenCost + apiCost + computeCost
    
    // Apply security multiplier
    const securityAdjustedTotal = baseTotal * selectedSecurity.multiplier
    
    // Apply 30% markup (as per spec)
    const markupTotal = securityAdjustedTotal * 1.30
    
    // Apply 15% buffer (refundable)
    const finalCostWithBuffer = markupTotal * 1.15
    
    // Calculate refundable buffer amount
    const refundableBuffer = finalCostWithBuffer - markupTotal
    
    // Monthly operational cost
    const monthlyTokenCost = (monthlyTokens / 1000000) * (selectedLLM.input + selectedLLM.output)
    const monthlyApiCost = (apiCalls * 0.3) * 0.01 // Assume 30% of build API calls monthly
    const monthlyComputeCost = (computeMinutes * 0.2) * 0.008 // Assume 20% of build compute monthly
    const monthlyBaseTotal = monthlyTokenCost + monthlyApiCost + monthlyComputeCost
    const monthlyFinalCost = monthlyBaseTotal * selectedSecurity.multiplier * 1.30

    // Check if subscription covers monthly usage
    const tokenOverage = Math.max(0, monthlyTokens - selectedSubscription.tokens)
    const overageCost = (tokenOverage / 1000) * selectedSubscription.overage

    // Check if build tokens exceed subscription allowance
    const buildTokenOverage = Math.max(0, buildTokens - selectedSubscription.tokens)
    const buildOverageCost = (buildTokenOverage / 1000) * selectedSubscription.overage
    const canBuild = buildTokens <= selectedSubscription.tokens

    const breakdown = {
      buildCost: {
        tokenCost: tokenCost,
        apiCost: apiCost,
        computeCost: computeCost,
        baseTotal: baseTotal,
        securityMultiplier: selectedSecurity.multiplier,
        securityAdjustedTotal: securityAdjustedTotal,
        markupTotal: markupTotal,
        finalCostWithBuffer: finalCostWithBuffer,
        refundableBuffer: refundableBuffer,
        setupFee: selectedSecurity.setupFee,
        canBuild: canBuild,
        buildOverageCost: buildOverageCost
      },
      monthlyCost: {
        subscriptionFee: selectedSubscription.price,
        includedTokens: selectedSubscription.tokens,
        usedTokens: monthlyTokens,
        overageTokens: tokenOverage,
        overageCost: overageCost,
        operationalCost: monthlyFinalCost,
        totalMonthlyCost: selectedSubscription.price + overageCost
      },
      recommendations: {
        optimalModel: selectedLLM.tier === 'Cost Effective' ? 'Current selection is cost-optimal' : 'Consider DeepSeek R2 for cost optimization',
        securityNote: selectedSecurity.multiplier > 1.3 ? 'High security tier - ensure compliance requirements justify cost' : 'Security tier appropriate for most use cases',
        subscriptionNote: !canBuild ? 'Must upgrade subscription tier - build exceeds token allowance' : tokenOverage > 0 ? 'Consider upgrading subscription tier to reduce overage costs' : 'Subscription tier covers expected usage'
      }
    }

    setCostBreakdown(breakdown)
    if (onCostCalculated) {
      onCostCalculated(breakdown)
    }
  }

  useEffect(() => {
    calculateCosts()
  }, [plugType, securityTier, llmModel, subscriptionTier, buildTokens, monthlyTokens, computeMinutes, apiCalls])

  // Auto-adjust tokens based on plug type
  useEffect(() => {
    const selectedPlugData = plugTypes[plugType]
    setBuildTokens(selectedPlugData.baseTokens)
    setApiCalls(selectedPlugData.baseApi)
    setComputeMinutes(selectedPlugData.baseCompute)
    setMonthlyTokens(Math.floor(selectedPlugData.baseTokens * 0.6)) // Estimate 60% for monthly usage
  }, [plugType])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-blue-500" />
            <span>ACHEEVY Deploy Cost Calculator</span>
            <Badge variant="secondary">Curryville by ACHIEVEMOR</Badge>
          </CardTitle>
          <CardDescription>
            Calculate accurate costs for your AI automation plug with correct pricing: 30% markup + 15% refundable buffer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
              <TabsTrigger value="results">Cost Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subscription Tier Selection */}
                <div className="space-y-3">
                  <Label htmlFor="subscription-tier" className="text-base font-medium">
                    Subscription Tier
                  </Label>
                  <Select value={subscriptionTier} onValueChange={setSubscriptionTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(subscriptionTiers).map(([key, tier]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span className="flex items-center">
                              {key === 'coffee' && <Coffee className="h-4 w-4 mr-1" />}
                              {tier.name}
                            </span>
                            <Badge variant="outline">${tier.price}/mo</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {subscriptionTiers[subscriptionTier]?.description}
                  </div>
                </div>

                {/* Plug Type Selection */}
                <div className="space-y-3">
                  <Label htmlFor="plug-type" className="text-base font-medium">
                    Plug Complexity
                  </Label>
                  <Select value={plugType} onValueChange={setPlugType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plug type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(plugTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span>{type.name}</span>
                            <Badge variant="outline">{type.complexity}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {plugTypes[plugType]?.description}
                  </div>
                </div>

                {/* Security Tier Selection */}
                <div className="space-y-3">
                  <Label htmlFor="security-tier" className="text-base font-medium">
                    Security Tier
                  </Label>
                  <Select value={securityTier} onValueChange={setSecurityTier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(securityTiers).map(([key, tier]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span>{tier.name}</span>
                            <Badge variant="outline">{tier.multiplier}x</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {securityTiers[securityTier]?.description}
                  </div>
                </div>

                {/* LLM Model Selection */}
                <div className="space-y-3">
                  <Label htmlFor="llm-model" className="text-base font-medium">
                    LLM Model
                  </Label>
                  <Select value={llmModel} onValueChange={setLlmModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select LLM model" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(llmPricing).map(([key, model]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <Badge variant="outline">{model.tier}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {llmPricing[llmModel]?.description}
                  </div>
                </div>
              </div>

              {/* Build Compatibility Check */}
              {costBreakdown && !costBreakdown.buildCost.canBuild && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium text-red-800 dark:text-red-200">
                      Subscription Upgrade Required
                    </h4>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-2">
                    This plug requires {buildTokens.toLocaleString()} tokens to build, but your {subscriptionTiers[subscriptionTier].name} plan only includes {subscriptionTiers[subscriptionTier].tokens.toLocaleString()} tokens. 
                    You must upgrade your subscription tier to build this plug.
                  </p>
                </div>
              )}

              {/* Quick Configuration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(plugTypes).map(([key, type]) => (
                  <Card 
                    key={key} 
                    className={`cursor-pointer transition-all ${
                      plugType === key 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setPlugType(key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{type.name}</h4>
                        <Badge variant={plugType === key ? "default" : "outline"}>
                          {type.complexity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {type.description}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Tokens:</span>
                          <span>{type.baseTokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery:</span>
                          <span>{type.deliveryTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Build Tokens */}
                <div className="space-y-3">
                  <Label htmlFor="build-tokens" className="text-base font-medium">
                    Build Tokens Required
                  </Label>
                  <Input
                    id="build-tokens"
                    type="number"
                    value={buildTokens}
                    onChange={(e) => setBuildTokens(parseInt(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated tokens needed to build the plug
                  </div>
                </div>

                {/* Monthly Tokens */}
                <div className="space-y-3">
                  <Label htmlFor="monthly-tokens" className="text-base font-medium">
                    Monthly Token Usage
                  </Label>
                  <Input
                    id="monthly-tokens"
                    type="number"
                    value={monthlyTokens}
                    onChange={(e) => setMonthlyTokens(parseInt(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Expected monthly operational token usage
                  </div>
                </div>

                {/* API Calls */}
                <div className="space-y-3">
                  <Label htmlFor="api-calls" className="text-base font-medium">
                    API Calls (Build)
                  </Label>
                  <Input
                    id="api-calls"
                    type="number"
                    value={apiCalls}
                    onChange={(e) => setApiCalls(parseInt(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Third-party API calls during build process
                  </div>
                </div>

                {/* Compute Minutes */}
                <div className="space-y-3">
                  <Label htmlFor="compute-minutes" className="text-base font-medium">
                    Compute Minutes
                  </Label>
                  <Input
                    id="compute-minutes"
                    type="number"
                    value={computeMinutes}
                    onChange={(e) => setComputeMinutes(parseInt(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Estimated compute time for processing ($0.008/minute)
                  </div>
                </div>
              </div>

              {/* Security Requirements Display */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Security Requirements: {securityTiers[securityTier]?.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Controls:</h4>
                      <ul className="space-y-1">
                        {securityTiers[securityTier]?.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Compliance Standards:</h4>
                      <div className="flex flex-wrap gap-2">
                        {securityTiers[securityTier]?.compliance.map((comp, index) => (
                          <Badge key={index} variant="outline">{comp}</Badge>
                        ))}
                      </div>
                    </div>
                    {securityTiers[securityTier]?.setupFee > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-medium">Setup Fee:</span>
                        <span className="text-lg font-bold">${securityTiers[securityTier]?.setupFee}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {costBreakdown && (
                <>
                  {/* Build Cost Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <span>Build Cost Breakdown</span>
                        {!costBreakdown.buildCost.canBuild && (
                          <Badge variant="destructive">Upgrade Required</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Token Cost:</span>
                            <span>${costBreakdown.buildCost.tokenCost.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>API Cost:</span>
                            <span>${costBreakdown.buildCost.apiCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Compute Cost:</span>
                            <span>${costBreakdown.buildCost.computeCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Base Total:</span>
                            <span>${costBreakdown.buildCost.baseTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Multiplier ({costBreakdown.buildCost.securityMultiplier}x):</span>
                            <span>${costBreakdown.buildCost.securityAdjustedTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Markup (30%):</span>
                            <span>${costBreakdown.buildCost.markupTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Buffer (15% - Refundable):</span>
                            <span>${costBreakdown.buildCost.refundableBuffer.toFixed(2)}</span>
                          </div>
                          {costBreakdown.buildCost.setupFee > 0 && (
                            <div className="flex justify-between">
                              <span>Security Setup Fee:</span>
                              <span>${costBreakdown.buildCost.setupFee}</span>
                            </div>
                          )}
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Build Cost:</span>
                          <span className="text-green-600">
                            ${(costBreakdown.buildCost.finalCostWithBuffer + costBreakdown.buildCost.setupFee).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          * ${costBreakdown.buildCost.refundableBuffer.toFixed(2)} buffer will be refunded if actual costs are lower
                        </div>
                        {!costBreakdown.buildCost.canBuild && (
                          <div className="text-sm text-red-600 dark:text-red-400">
                            * Additional overage cost: ${costBreakdown.buildCost.buildOverageCost.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Cost Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        <span>Monthly Operational Cost</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Subscription Fee:</span>
                            <span>${costBreakdown.monthlyCost.subscriptionFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Included Tokens:</span>
                            <span>{costBreakdown.monthlyCost.includedTokens.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expected Usage:</span>
                            <span>{costBreakdown.monthlyCost.usedTokens.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overage Tokens:</span>
                            <span>{costBreakdown.monthlyCost.overageTokens.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overage Cost:</span>
                            <span>${costBreakdown.monthlyCost.overageCost.toFixed(2)}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Monthly Cost:</span>
                          <span className="text-blue-600">${costBreakdown.monthlyCost.totalMonthlyCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-purple-500" />
                        <span>Optimization Recommendations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div>
                            <span className="font-medium">Model Selection: </span>
                            <span className="text-sm">{costBreakdown.recommendations.optimalModel}</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <span className="font-medium">Security: </span>
                            <span className="text-sm">{costBreakdown.recommendations.securityNote}</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5" />
                          <div>
                            <span className="font-medium">Subscription: </span>
                            <span className="text-sm">{costBreakdown.recommendations.subscriptionNote}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default CorrectedCostCalculator

