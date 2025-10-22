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
  Rocket,
  Coffee,
  AlertCircle
} from 'lucide-react'

const CorrectedPricingTiers = ({ selectedTier, setSelectedTier }) => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const pricingTiers = {
    coffee: {
      name: 'Buy Me A Coffee ☕️',
      icon: Coffee,
      price: { monthly: 7, annual: 70 },
      tokens: 50000,
      overage: 0.08,
      setupFee: 0,
      description: 'Demo/try tier for exploring AI automation basics',
      target: 'Individuals & Hobbyists',
      popular: false,
      features: [
        '50,000 tokens monthly',
        '1-2 sample/basic plugs only',
        'Pay-per-use after token exhaustion',
        'Community support & documentation',
        'Basic tool access (Core AI shelf)',
        'No advanced plugs allowed',
        'Perfect for testing and learning'
      ],
      limits: {
        plugs: '1-2 basic only',
        users: 1,
        support: 'Community',
        sla: 'Best effort',
        advanced: false
      },
      restrictions: [
        'Cannot build plugs above allocated tokens',
        'No access to premium LLM models',
        'Limited to basic automation only'
      ],
      color: 'from-amber-500 to-orange-600'
    },
    lite: {
      name: 'LITE',
      icon: Zap,
      price: { monthly: 19, annual: 190 },
      tokens: 250000,
      overage: 0.07,
      setupFee: 0,
      description: 'Basic automation for small teams and simple workflows',
      target: 'Small Teams & Basic Automation',
      popular: true,
      features: [
        '250,000 tokens monthly',
        '1-2 Lite plugs per month',
        'Basic automation capabilities',
        'Standard support with documentation',
        'Core tool access (AI Core, Basic APIs)',
        'Simple workflow automation',
        'Email and chat support'
      ],
      limits: {
        plugs: '1-2 Lite plugs/month',
        users: 5,
        support: 'Standard',
        sla: '99% uptime',
        advanced: false
      },
      restrictions: [
        'Cannot build plugs above allocated tokens',
        'Limited to Lite complexity only',
        'No access to premium integrations'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    medium: {
      name: 'MEDIUM',
      icon: Users,
      price: { monthly: 59, annual: 590 },
      tokens: 600000,
      overage: 0.06,
      setupFee: 0,
      description: 'Ideal for independent podcasters, freelancers, and growing businesses',
      target: 'Freelancers & Growing Businesses',
      popular: false,
      features: [
        '600,000 tokens monthly',
        'Modest complexity plugs',
        'Enhanced automation capabilities',
        'Priority support with faster response',
        'Extended tool access (Voice/Media shelf)',
        'Multi-step workflow automation',
        'Advanced integrations available'
      ],
      limits: {
        plugs: 'Modest complexity',
        users: 15,
        support: 'Priority',
        sla: '99.5% uptime',
        advanced: true
      },
      restrictions: [
        'Cannot exceed modest complexity',
        'Limited concurrent automations'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    heavy: {
      name: 'HEAVY',
      icon: Building,
      price: { monthly: 149, annual: 1490 },
      tokens: 1500000,
      overage: 0.05,
      setupFee: 0,
      description: 'Enable large or high-frequency automations for established companies',
      target: 'Established Companies & High-Volume',
      popular: false,
      features: [
        '1,500,000 tokens monthly',
        'Advanced/enterprise plugs',
        'High-frequency automation support',
        'Dedicated support team',
        'Full tool access (All shelves)',
        'Complex workflow orchestration',
        'Premium LLM models included',
        'Custom integration support'
      ],
      limits: {
        plugs: 'Advanced/enterprise',
        users: 50,
        support: 'Dedicated',
        sla: '99.9% uptime',
        advanced: true
      },
      restrictions: [
        'Subject to fair use policy',
        'Enterprise features available'
      ],
      color: 'from-purple-500 to-violet-600'
    },
    superior: {
      name: 'SUPERIOR (with GROK-4)',
      icon: Crown,
      price: { monthly: 150, annual: 1500 },
      tokens: 3000000,
      overage: 0.03,
      setupFee: 150,
      description: 'Digital organizations/twins only - requires consultation and setup',
      target: 'Digital Organizations & Enterprise Twins',
      popular: false,
      features: [
        '3,000,000+ tokens monthly',
        'Digital twin org concierge launch',
        'Requires consultation before setup',
        'Maintenance fees apply per plug',
        'Premium tool access with GROK-4',
        'White-label deployment options',
        'Custom security implementations',
        'Dedicated success management'
      ],
      limits: {
        plugs: 'Digital orgs/twins only',
        users: 'Unlimited',
        support: 'Concierge',
        sla: '99.99% uptime',
        advanced: true
      },
      restrictions: [
        'Requires consultation approval',
        'Setup fee per digital twin',
        'Maintenance fees apply'
      ],
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
          Curryville by ACHIEVEMOR Pricing
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose the right plan for your AI automation needs. All plans include 30% markup coverage and 15% refundable buffer for cost protection.
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
              Save up to 17%
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
                  {billingCycle === 'annual' && savings > 0 && (
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
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {tier.tokens.toLocaleString()} tokens/month
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {tier.setupFee > 0 ? `Setup: $${tier.setupFee} • ` : ''}Overage: ${tier.overage}/1K tokens
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tier.description}
                </p>
                
                {/* Key Features */}
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
                
                {/* Restrictions */}
                {tier.restrictions && tier.restrictions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Limitations:</h4>
                    <ul className="space-y-1">
                      {tier.restrictions.slice(0, 2).map((restriction, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs">
                          <AlertCircle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
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
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Users:</span>
                    <span className="font-medium">{tier.limits.users}</span>
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

      {/* Detailed Comparison Table */}
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
                  <td className="py-3 px-4 font-medium">Monthly Price</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      ${tier.price.monthly}
                    </td>
                  ))}
                </tr>
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
                  <td className="py-3 px-4 font-medium">Setup Fee</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.setupFee > 0 ? `$${tier.setupFee}` : 'Free'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Plug Complexity</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.limits.plugs}
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
                  <td className="py-3 px-4 font-medium">Advanced Features</td>
                  {Object.entries(pricingTiers).map(([key, tier]) => (
                    <td key={key} className="text-center py-3 px-4">
                      {tier.limits.advanced ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span>Our Pricing Philosophy</span>
          </CardTitle>
          <CardDescription>
            Transparent, fair, and designed to grow with your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's Included in Every Plan</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">30% markup coverage for platform sustainability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">15% refundable buffer for cost protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Transparent overage pricing with no surprises</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Access to ACHEEVY AI consultation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Boomer_Ang's agent orchestration</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fair Use Policy</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  • <strong>Token Limits:</strong> If a plug build requires more tokens than your plan includes, you must upgrade your subscription tier first.
                </p>
                <p>
                  • <strong>Refund Policy:</strong> Any plug build quote includes a 15% buffer; unused amount is refunded immediately after build.
                </p>
                <p>
                  • <strong>Overage Billing:</strong> Monthly automation usage beyond your token allowance is charged at your tier's overage rate.
                </p>
                <p>
                  • <strong>Upgrade Path:</strong> You can upgrade your plan at any time to access higher complexity plugs and more tokens.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Return on Investment</span>
          </CardTitle>
          <CardDescription>
            Conservative estimates based on customer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2-6 weeks</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Typical payback period</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">200-400%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">First year ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">40%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cost savings vs manual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">2-25 hours</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Delivery time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CorrectedPricingTiers

