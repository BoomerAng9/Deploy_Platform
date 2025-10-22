import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  Target, 
  TrendingUp,
  Crown,
  Building,
  Rocket
} from 'lucide-react'

const UpdatedPricingTiers = ({ selectedTier, setSelectedTier }) => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const pricingTiers = {
    starter: {
      name: 'Starter',
      icon: Zap,
      price: { monthly: 49, annual: 490 },
      originalPrice: { monthly: 59, annual: 590 },
      tokens: 50000,
      overage: 0.08,
      setupFee: 99,
      description: 'Perfect for individual developers and small teams exploring AI automation',
      target: 'Individual Developers & Small Teams',
      popular: false,
      features: [
        '50,000 tokens monthly',
        'Cost-effective LLM models (DeepSeek R2, Boost.Space)',
        'Basic tool access (AI Core, UX shelves)',
        'Light to Medium security tiers',
        'Community support & documentation',
        'Up to 7 Lite Plugs per month',
        'Basic analytics and reporting',
        'Standard deployment options'
      ],
      limits: {
        litePlugs: 7,
        mediumPlugs: 1,
        heavyPlugs: 0,
        users: 5,
        support: 'Community',
        sla: 'Best effort'
      },
      savings: 'Save $118/year',
      color: 'from-green-500 to-emerald-600'
    },
    professional: {
      name: 'Professional',
      icon: Users,
      price: { monthly: 149, annual: 1490 },
      originalPrice: { monthly: 179, annual: 1790 },
      tokens: 200000,
      overage: 0.06,
      setupFee: 199,
      description: 'Ideal for growing businesses and professional development teams',
      target: 'Growing Businesses & Professional Teams',
      popular: true,
      features: [
        '200,000 tokens monthly',
        'Premium LLM models (GPT-4o, Claude Opus 4)',
        'Expanded tool inventory (Voice/Media, API shelves)',
        'High security tier implementations',
        'Priority support with dedicated success management',
        'Up to 28 Lite or 5 Medium Plugs per month',
        'Advanced analytics and performance insights',
        'Custom integration support',
        'Priority processing for deployments'
      ],
      limits: {
        litePlugs: 28,
        mediumPlugs: 5,
        heavyPlugs: 1,
        users: 25,
        support: 'Priority',
        sla: '99.5% uptime'
      },
      savings: 'Save $298/year',
      color: 'from-blue-500 to-indigo-600'
    },
    business: {
      name: 'Business',
      icon: Building,
      price: { monthly: 399, annual: 3990 },
      originalPrice: { monthly: 479, annual: 4790 },
      tokens: 600000,
      overage: 0.04,
      setupFee: 399,
      description: 'Comprehensive solution for established companies with complex automation needs',
      target: 'Established Companies & Complex Automation',
      popular: false,
      features: [
        '600,000 tokens monthly',
        'Full access to all LLM models and tools',
        'Complete tool inventory access',
        'Superior security tier with advanced compliance',
        'Dedicated account management and technical support',
        'Up to 85 Lite, 17 Medium, or 4 Heavy Plugs per month',
        'Custom integration development',
        'Quarterly strategy sessions and optimization reviews',
        'White-label deployment options',
        'Advanced security and compliance reporting'
      ],
      limits: {
        litePlugs: 85,
        mediumPlugs: 17,
        heavyPlugs: 4,
        users: 100,
        support: 'Dedicated',
        sla: '99.9% uptime'
      },
      savings: 'Save $798/year',
      color: 'from-purple-500 to-violet-600'
    },
    enterprise: {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 999, annual: 9990 },
      originalPrice: { monthly: 1199, annual: 11990 },
      tokens: 2000000,
      overage: 0.03,
      setupFee: 799,
      description: 'Enterprise-grade solution for large organizations with mission-critical requirements',
      target: 'Large Organizations & Mission-Critical Systems',
      popular: false,
      features: [
        '2,000,000 tokens monthly',
        'Unlimited access to all platform capabilities',
        'Defense-Grade security implementations',
        'Dedicated infrastructure and support teams',
        '24/7 priority support with guaranteed response times',
        'Up to 285 Lite, 57 Medium, or 13 Heavy Plugs per month',
        'Complete white-label platform licensing',
        'Custom development and professional services',
        'Dedicated cloud infrastructure',
        'Custom SLA agreements and compliance support'
      ],
      limits: {
        litePlugs: 285,
        mediumPlugs: 57,
        heavyPlugs: 13,
        users: 'Unlimited',
        support: '24/7 Dedicated',
        sla: '99.99% uptime'
      },
      savings: 'Save $2,398/year',
      color: 'from-amber-500 to-orange-600'
    },
    elite: {
      name: 'Elite',
      icon: Rocket,
      price: { monthly: 2499, annual: 24990 },
      originalPrice: { monthly: 2999, annual: 29990 },
      tokens: 5000000,
      overage: 0.02,
      setupFee: 1499,
      description: 'Ultimate solution for Fortune 500 companies and government agencies',
      target: 'Fortune 500 & Government Agencies',
      popular: false,
      features: [
        '5,000,000 tokens monthly',
        'Dedicated cloud infrastructure with custom configurations',
        'Custom security implementations exceeding Defense-Grade',
        'Unlimited professional services and custom development',
        'Complete white-label platform licensing with source code',
        'Up to 714 Lite, 142 Medium, or 33 Heavy Plugs per month',
        'Dedicated success and technical teams',
        'Custom SLA agreements with guaranteed performance metrics',
        'Air-gap deployment options for maximum security',
        'Executive-level strategic consulting and roadmap planning'
      ],
      limits: {
        litePlugs: 714,
        mediumPlugs: 142,
        heavyPlugs: 33,
        users: 'Unlimited',
        support: 'Executive Level',
        sla: '99.999% uptime'
      },
      savings: 'Save $4,998/year',
      color: 'from-rose-500 to-pink-600'
    }
  }

  const handleTierSelect = (tierKey) => {
    setSelectedTier(tierKey)
  }

  const calculateAnnualSavings = (tier) => {
    const monthlyCost = tier.price.monthly * 12
    const annualCost = tier.price.annual
    return monthlyCost - annualCost
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Choose Your Deploy Plan
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Restructured pricing with premium positioning. All plans include 40% markup coverage and 15% refundable buffer for cost protection.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingCycle === 'annual' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'annual' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
            Annual
          </span>
          {billingCycle === 'annual' && (
            <Badge variant="secondary" className="ml-2">
              Save up to 20%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Object.entries(pricingTiers).map(([key, tier]) => {
          const Icon = tier.icon
          const isSelected = selectedTier === key
          const currentPrice = tier.price[billingCycle]
          const savings = calculateAnnualSavings(tier)
          
          return (
            <Card 
              key={key}
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg hover:scale-102'
              } ${tier.popular ? 'border-blue-500' : ''}`}
              onClick={() => handleTierSelect(key)}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`bg-gradient-to-r ${tier.color} text-white text-center py-2 text-sm font-medium`}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className={`${tier.popular ? 'pt-12' : 'pt-6'} pb-4`}>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {billingCycle === 'annual' && (
                    <Badge variant="outline" className="text-xs">
                      Save ${savings}
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-sm">{tier.target}</CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${currentPrice}
                    </span>
                    <span className="text-sm text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  
                  {billingCycle === 'annual' && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">${tier.originalPrice.annual}</span>
                      <span className="ml-2 text-green-600 font-medium">{tier.savings}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {tier.tokens.toLocaleString()} tokens/month
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Setup fee: ${tier.setupFee} • Overage: ${tier.overage}/1K tokens
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tier.description}
                </p>
                
                {/* Key Limits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Plug Capacity:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">{tier.limits.litePlugs}</div>
                      <div className="text-gray-500">Lite</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{tier.limits.mediumPlugs}</div>
                      <div className="text-gray-500">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{tier.limits.heavyPlugs}</div>
                      <div className="text-gray-500">Heavy</div>
                    </div>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Features:</h4>
                  <ul className="space-y-1">
                    {tier.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs">
                        <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                    {tier.features.length > 4 && (
                      <li className="text-xs text-gray-500">
                        +{tier.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Support & SLA */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Support:</span>
                    <span className="font-medium">{tier.limits.support}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">SLA:</span>
                    <span className="font-medium">{tier.limits.sla}</span>
                  </div>
                </div>
                
                <Button 
                  className={`w-full ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : tier.popular 
                        ? `bg-gradient-to-r ${tier.color} hover:opacity-90` 
                        : ''
                  }`}
                  variant={isSelected ? 'default' : tier.popular ? 'default' : 'outline'}
                >
                  {isSelected ? 'Selected' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feature Comparison</CardTitle>
          <CardDescription>
            Compare all features across our subscription tiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <th key={key} className="text-center py-3 px-4 min-w-[120px]">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Monthly Tokens</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.tokens.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Overage Rate</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      ${tier.overage}/1K
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Max Heavy Plugs</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.limits.heavyPlugs}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Support Level</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.limits.support}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">SLA Guarantee</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.limits.sla}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Setup Fee</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      ${tier.setupFee}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Return on Investment</span>
          </CardTitle>
          <CardDescription>
            Conservative estimates show 300-500% ROI within the first year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3-6 months</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Typical payback period</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">300-500%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">First year ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">20%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cost savings vs manual</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdatedPricingTiers

