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
  BarChart3
} from 'lucide-react'

const UpdatedCostCalculator = ({ selectedPlug, onCostCalculated }) => {
  const [plugType, setPlugType] = useState('medium')
  const [securityTier, setSecurityTier] = useState('medium')
  const [llmModel, setLlmModel] = useState('deepseek-r2')
  const [subscriptionTier, setSubscriptionTier] = useState('professional')
  const [buildTokens, setBuildTokens] = useState(35000)
  const [monthlyTokens, setMonthlyTokens] = useState(25000)
  const [computeMinutes, setComputeMinutes] = useState(30)
  const [apiCalls, setApiCalls] = useState(100)
  const [costBreakdown, setCostBreakdown] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Updated LLM Pricing (per 1M tokens) - July 2025
  const llmPricing = {
    'deepseek-r2': { 
      input: 0.27, 
      output: 1.10, 
      name: 'DeepSeek R2', 
      tier: 'Cost Effective',
      description: 'Optimal cost-performance ratio, recommended for most use cases'
    },
    'gpt-4o': { 
      input: 2.50, 
      output: 10.00, 
      name: 'GPT-4o', 
      tier: 'Standard',
      description: 'Advanced reasoning and complex task handling'
    },
    'claude-opus': { 
      input: 15.00, 
      output: 75.00, 
      name: 'Claude Opus 4', 
      tier: 'Premium',
      description: 'Highest quality for complex analysis and creative tasks'
    },
    'gemini-pro': { 
      input: 1.25, 
      output: 10.00, 
      name: 'Gemini 2.5 Pro', 
      tier: 'Standard',
      description: 'Multimodal capabilities with competitive performance'
    },
    'perplexity-sonar': { 
      input: 1.00, 
      output: 3.00, 
      name: 'Perplexity Sonar', 
      tier: 'Standard',
      description: 'Real-time search and research capabilities'
    },
    'boost-space': { 
      input: 0.50, 
      output: 2.00, 
      name: 'Boost.Space MCP', 
      tier: 'Cost Effective',
      description: 'Model Context Protocol integration with cost efficiency'
    }
  }

  // Updated Security Tiers with comprehensive requirements
  const securityTiers = {
    'light': { 
      multiplier: 1.0, 
      name: 'Light Security',
      description: 'Basic validation and standard security practices',
      requirements: [
        'Basic authentication & authorization',
        'TLS 1.3 encryption for data transmission',
        'Standard logging and monitoring',
        'Basic input validation'
      ],
      compliance: ['Basic data protection'],
      cost: '$0 setup fee'
    },
    'medium': { 
      multiplier: 1.2, 
      name: 'Medium Security',
      description: 'Enhanced protection with policy enforcement',
      requirements: [
        'Open Policy Agent (OPA) implementation',
        'Basic Software Bill of Materials (SBOM)',
        'Enhanced audit logging',
        'Multi-factor authentication (MFA)',
        'Encrypted storage for sensitive data'
      ],
      compliance: ['GDPR basic compliance', 'SOC 2 Type I'],
      cost: '$99 setup fee'
    },
    'high': { 
      multiplier: 1.5, 
      name: 'High Security',
      description: 'Enterprise-grade protection for sensitive applications',
      requirements: [
        'Gatekeeper admission control',
        'Enhanced SBOM with vulnerability analysis',
        'ACP (Agentic Communication Protocol) logging',
        'Zero-trust network architecture',
        'Advanced threat detection',
        'Comprehensive security monitoring'
      ],
      compliance: ['HIPAA', 'SOC 2 Type II', 'PCI DSS Level 1'],
      cost: '$299 setup fee'
    },
    'superior': { 
      multiplier: 2.0, 
      name: 'Superior Security',
      description: 'Advanced protection with comprehensive audit trails',
      requirements: [
        'Full ACP audit recording with immutable logs',
        'Digital artifact signing and verification',
        'Advanced threat intelligence integration',
        'Hardware Security Module (HSM) integration',
        'Behavioral analysis for anomaly detection',
        'Comprehensive data loss prevention (DLP)'
      ],
      compliance: ['FedRAMP Moderate', 'ISO 27001', 'NIST Cybersecurity Framework'],
      cost: '$599 setup fee'
    },
    'defense-grade': { 
      multiplier: 3.0, 
      name: 'Defense-Grade Security',
      description: 'Military-standard protection for highest sensitivity',
      requirements: [
        'FIPS 140-2 Level 3 encryption standards',
        'Classified information handling capabilities',
        'Advanced Persistent Threat (APT) protection',
        'Complete supply chain security validation',
        'Air-gap deployment options',
        'Security clearance integration'
      ],
      compliance: ['FedRAMP High', 'DoD IL4/IL5', 'Common Criteria EAL4+'],
      cost: '$1,499 setup fee'
    }
  }

  // Updated Subscription Tiers - Restructured Pricing
  const subscriptionTiers = {
    'starter': {
      name: 'Starter',
      price: 49,
      tokens: 50000,
      overage: 0.08,
      setupFee: 99,
      description: 'Individual developers and small teams',
      features: [
        'Cost-effective LLM models',
        'Basic tool access',
        'Light to Medium security',
        'Community support',
        'Up to 7 Lite Plugs/month'
      ],
      maxLitePlugs: 7,
      maxMediumPlugs: 1,
      maxHeavyPlugs: 0
    },
    'professional': {
      name: 'Professional',
      price: 149,
      tokens: 200000,
      overage: 0.06,
      setupFee: 199,
      description: 'Growing businesses and professional teams',
      features: [
        'Premium LLM models access',
        'Expanded tool inventory',
        'High security tier',
        'Priority support',
        'Advanced analytics',
        'Up to 28 Lite or 5 Medium Plugs/month'
      ],
      maxLitePlugs: 28,
      maxMediumPlugs: 5,
      maxHeavyPlugs: 1
    },
    'business': {
      name: 'Business',
      price: 399,
      tokens: 600000,
      overage: 0.04,
      setupFee: 399,
      description: 'Established companies with complex automation',
      features: [
        'Full LLM model access',
        'Complete tool inventory',
        'Superior security tier',
        'Dedicated account management',
        'Custom integrations',
        'Quarterly strategy sessions'
      ],
      maxLitePlugs: 85,
      maxMediumPlugs: 17,
      maxHeavyPlugs: 4
    },
    'enterprise': {
      name: 'Enterprise',
      price: 999,
      tokens: 2000000,
      overage: 0.03,
      setupFee: 799,
      description: 'Large organizations with mission-critical needs',
      features: [
        'Unlimited platform access',
        'Defense-Grade security',
        'Dedicated infrastructure',
        '24/7 priority support',
        'White-label options',
        'Custom development'
      ],
      maxLitePlugs: 285,
      maxMediumPlugs: 57,
      maxHeavyPlugs: 13
    },
    'elite': {
      name: 'Elite',
      price: 2499,
      tokens: 5000000,
      overage: 0.02,
      setupFee: 1499,
      description: 'Fortune 500 and government agencies',
      features: [
        'Dedicated cloud infrastructure',
        'Custom security implementations',
        'Unlimited professional services',
        'Complete white-label licensing',
        'Custom SLA agreements',
        'Dedicated success teams'
      ],
      maxLitePlugs: 714,
      maxMediumPlugs: 142,
      maxHeavyPlugs: 33
    }
  }

  // Updated Plug Types with comprehensive specifications
  const plugTypes = {
    'lite': { 
      name: 'Lite Plug', 
      baseTokens: 7000, 
      baseApi: 10, 
      baseCompute: 5,
      description: 'Simple automation and basic workflows',
      examples: [
        'Data entry automation',
        'Basic report generation', 
        'Simple notifications',
        'Email automation',
        'Basic data processing'
      ],
      tools: ['ii-agent', 'Supabase', 'Basic APIs'],
      deliveryTime: '2-4 hours',
      complexity: 'Low'
    },
    'medium': { 
      name: 'Medium Plug', 
      baseTokens: 35000, 
      baseApi: 100, 
      baseCompute: 30,
      description: 'Complex business logic and integrations',
      examples: [
        'Content generation systems',
        'Multi-step workflows', 
        'API integrations',
        'Business process automation',
        'Customer service bots'
      ],
      tools: ['ii-agent', 'GPT-4o', 'ElevenLabs', 'Multiple APIs'],
      deliveryTime: '4-8 hours',
      complexity: 'Medium'
    },
    'heavy': { 
      name: 'Heavy Plug', 
      baseTokens: 150000, 
      baseApi: 500, 
      baseCompute: 180,
      description: 'Enterprise-level automation with extensive processing',
      examples: [
        'Sports analytics dashboard',
        'Complex data analysis platforms',
        'Multi-agent coordination systems',
        'Enterprise workflow automation',
        'Advanced AI-powered applications'
      ],
      tools: ['Full ii-agent ecosystem', 'Premium LLMs', 'Comprehensive APIs'],
      deliveryTime: '8-25 hours',
      complexity: 'High'
    }
  }

  // Calculate costs with updated logic
  const calculateCosts = () => {
    const selectedPlugData = plugTypes[plugType]
    const selectedSecurity = securityTiers[securityTier]
    const selectedLLM = llmPricing[llmModel]
    const selectedSubscription = subscriptionTiers[subscriptionTier]

    // Base token cost calculation
    const tokenCost = (buildTokens / 1000000) * (selectedLLM.input + selectedLLM.output)
    
    // API cost calculation ($0.01 per call average)
    const apiCost = apiCalls * 0.01
    
    // Compute cost calculation ($0.10 per minute)
    const computeCost = computeMinutes * 0.10
    
    // Base total before security multiplier
    const baseTotal = tokenCost + apiCost + computeCost
    
    // Apply security multiplier
    const securityAdjustedTotal = baseTotal * selectedSecurity.multiplier
    
    // Apply 40% markup
    const markupTotal = securityAdjustedTotal * 1.40
    
    // Apply 15% buffer
    const finalCostWithBuffer = markupTotal * 1.15
    
    // Calculate refundable buffer amount
    const refundableBuffer = finalCostWithBuffer - markupTotal
    
    // Monthly operational cost
    const monthlyTokenCost = (monthlyTokens / 1000000) * (selectedLLM.input + selectedLLM.output)
    const monthlyApiCost = (apiCalls * 0.5) * 0.01 // Assume 50% of build API calls monthly
    const monthlyComputeCost = (computeMinutes * 0.3) * 0.10 // Assume 30% of build compute monthly
    const monthlyBaseTotal = monthlyTokenCost + monthlyApiCost + monthlyComputeCost
    const monthlyFinalCost = monthlyBaseTotal * selectedSecurity.multiplier * 1.40 * 1.15

    // Check if subscription covers monthly usage
    const tokenOverage = Math.max(0, monthlyTokens - selectedSubscription.tokens)
    const overageCost = (tokenOverage / 1000) * selectedSubscription.overage

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
        refundableBuffer: refundableBuffer
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
        securityNote: selectedSecurity.multiplier > 2.0 ? 'High security tier - ensure compliance requirements justify cost' : 'Security tier appropriate for most use cases',
        subscriptionNote: tokenOverage > 0 ? 'Consider upgrading subscription tier to reduce overage costs' : 'Subscription tier covers expected usage'
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
    setMonthlyTokens(Math.floor(selectedPlugData.baseTokens * 0.7)) // Estimate 70% for monthly usage
  }, [plugType])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-blue-500" />
            <span>Deploy Cost Calculator</span>
            <Badge variant="secondary">Updated July 2025</Badge>
          </CardTitle>
          <CardDescription>
            Calculate accurate costs for your AI automation plug with our updated pricing model including 40% markup and 15% refundable buffer
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
                            <span>{tier.name}</span>
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
                    Estimated compute time for processing
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
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium">Setup Fee:</span>
                      <span className="text-lg font-bold">{securityTiers[securityTier]?.cost}</span>
                    </div>
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
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Token Cost:</span>
                            <span>${costBreakdown.buildCost.tokenCost.toFixed(2)}</span>
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
                            <span>Markup (40%):</span>
                            <span>${costBreakdown.buildCost.markupTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Buffer (15%):</span>
                            <span>${costBreakdown.buildCost.refundableBuffer.toFixed(2)}</span>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Build Cost:</span>
                          <span className="text-green-600">${costBreakdown.buildCost.finalCostWithBuffer.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          * ${costBreakdown.buildCost.refundableBuffer.toFixed(2)} buffer will be refunded if actual costs are lower
                        </div>
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

export default UpdatedCostCalculator

