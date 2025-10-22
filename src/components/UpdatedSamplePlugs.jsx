import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Play, 
  BarChart3, 
  PenTool, 
  Cog, 
  DollarSign, 
  Clock, 
  Users, 
  Zap,
  Target,
  TrendingUp,
  FileText,
  Database,
  Brain,
  Rocket,
  Shield,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

const UpdatedSamplePlugs = ({ onPlugSelected }) => {
  const [activeDemo, setActiveDemo] = useState(null)
  const [demoProgress, setDemoProgress] = useState(0)

  const samplePlugs = {
    'sports-analytics': {
      name: 'Sports Analytics Command Center',
      type: 'Heavy Plug',
      complexity: 'Enterprise',
      icon: BarChart3,
      estimatedCost: 1247,
      monthlyCost: 89,
      deliveryTime: '8-25 hours',
      description: 'Comprehensive sports data analysis platform with real-time insights, predictive modeling, and automated reporting',
      targetAudience: 'Sports organizations, media companies, betting platforms',
      demoAvailable: true,
      features: [
        'Real-time data aggregation from 247Sports, On3, PFF, ESPN APIs',
        'Advanced predictive modeling using machine learning',
        'Automated report generation with natural language summaries',
        'Interactive dashboards with customizable visualizations',
        'Sentiment analysis of social media and news coverage',
        'Recruiting pipeline analysis and trend detection',
        'Performance metrics tracking across multiple sports',
        'Automated alerting for significant events'
      ],
      technicalSpecs: {
        tokens: 120000,
        apis: ['247Sports API', 'On3 API', 'PFF API', 'ESPN API', 'Perplexity Sonar'],
        models: ['ii-agent', 'ii-researcher', 'Perplexity Agent'],
        security: 'Superior',
        infrastructure: 'Modal compute, Supabase database, React dashboard'
      },
      roi: {
        timeToValue: '2-4 weeks',
        costSavings: '60% vs custom development',
        efficiency: '10x faster than manual analysis'
      },
      demoFeatures: [
        'Live player statistics dashboard',
        'Team performance comparison tools',
        'Recruiting trend analysis',
        'Predictive game outcome models',
        'Automated insight generation'
      ]
    },
    'content-studio': {
      name: 'Content Generation Studio',
      type: 'Medium Plug',
      complexity: 'Professional',
      icon: PenTool,
      estimatedCost: 387,
      monthlyCost: 34,
      deliveryTime: '4-8 hours',
      description: 'Automated content creation across multiple formats with brand consistency and SEO optimization',
      targetAudience: 'Marketing agencies, content creators, small businesses',
      demoAvailable: true,
      features: [
        'Multi-format content generation (articles, social posts, scripts)',
        'Brand voice consistency across all content',
        'SEO optimization with keyword integration',
        'Voice synthesis with ElevenLabs integration',
        'Custom imagery generation with DALL-E 3',
        'Content scheduling and distribution automation',
        'Performance analytics and optimization',
        'Collaborative workflow management'
      ],
      technicalSpecs: {
        tokens: 40000,
        apis: ['GPT-4o', 'ElevenLabs', 'DALL-E 3', 'Social Media APIs'],
        models: ['ii-agent', 'Content optimization algorithms'],
        security: 'High',
        infrastructure: 'Automated publishing, CMS integration'
      },
      roi: {
        timeToValue: '1-2 weeks',
        costSavings: '70% vs hiring content team',
        efficiency: '5x faster content production'
      },
      demoFeatures: [
        'Blog post generation from brief',
        'Social media campaign creation',
        'Podcast script with voice synthesis',
        'Marketing materials with visuals',
        'SEO-optimized content packages'
      ]
    },
    'business-optimizer': {
      name: 'Business Process Optimizer',
      type: 'Lite Plug',
      complexity: 'Standard',
      icon: Cog,
      estimatedCost: 127,
      monthlyCost: 12,
      deliveryTime: '2-4 hours',
      description: 'Streamlined automation for routine business processes with immediate productivity gains',
      targetAudience: 'Small businesses, individual entrepreneurs, department managers',
      demoAvailable: true,
      features: [
        'Automated data entry and processing',
        'Scheduled report generation',
        'Intelligent email routing and responses',
        'Basic analytics and performance tracking',
        'Invoice processing automation',
        'Customer inquiry handling',
        'Inventory tracking and alerts',
        'Simple workflow optimization'
      ],
      technicalSpecs: {
        tokens: 8000,
        apis: ['DeepSeek R2', 'Basic business APIs', 'Email integration'],
        models: ['ii-agent', 'Basic automation workflows'],
        security: 'Medium',
        infrastructure: 'Lightweight deployment, cloud-based'
      },
      roi: {
        timeToValue: '3-5 days',
        costSavings: '40% vs manual processes',
        efficiency: '3x faster task completion'
      },
      demoFeatures: [
        'Invoice processing automation',
        'Customer inquiry responses',
        'Inventory tracking dashboard',
        'Automated report generation',
        'Email management system'
      ]
    },
    'ai-research-assistant': {
      name: 'AI Research Assistant',
      type: 'Medium Plug',
      complexity: 'Professional',
      icon: Brain,
      estimatedCost: 445,
      monthlyCost: 41,
      deliveryTime: '5-10 hours',
      description: 'Intelligent research automation with comprehensive analysis and insight generation',
      targetAudience: 'Research teams, analysts, consulting firms',
      demoAvailable: true,
      features: [
        'Automated research across multiple sources',
        'Intelligent document analysis and summarization',
        'Trend identification and pattern recognition',
        'Competitive intelligence gathering',
        'Citation management and verification',
        'Research report generation',
        'Data visualization and insights',
        'Collaborative research workflows'
      ],
      technicalSpecs: {
        tokens: 55000,
        apis: ['ii-researcher', 'Perplexity Sonar', 'Academic databases'],
        models: ['Claude Opus 4', 'ii-agent', 'CommonGround'],
        security: 'High',
        infrastructure: 'Advanced search, knowledge graphs'
      },
      roi: {
        timeToValue: '1-3 weeks',
        costSavings: '50% vs research team',
        efficiency: '8x faster research cycles'
      },
      demoFeatures: [
        'Market research automation',
        'Competitive analysis reports',
        'Academic literature reviews',
        'Trend analysis dashboards',
        'Citation and fact-checking'
      ]
    },
    'customer-service-ai': {
      name: 'Customer Service AI',
      type: 'Medium Plug',
      complexity: 'Professional',
      icon: Users,
      estimatedCost: 356,
      monthlyCost: 31,
      deliveryTime: '4-8 hours',
      description: 'Intelligent customer service automation with natural language understanding and escalation',
      targetAudience: 'E-commerce, SaaS companies, service businesses',
      demoAvailable: true,
      features: [
        '24/7 automated customer support',
        'Natural language query understanding',
        'Intelligent ticket routing and escalation',
        'Knowledge base integration',
        'Multi-channel support (chat, email, phone)',
        'Customer sentiment analysis',
        'Performance analytics and optimization',
        'Integration with CRM systems'
      ],
      technicalSpecs: {
        tokens: 45000,
        apis: ['GPT-4o', 'Whisper API', 'CRM integrations'],
        models: ['ii-agent', 'Sentiment analysis', 'Intent recognition'],
        security: 'High',
        infrastructure: 'Real-time chat, voice processing'
      },
      roi: {
        timeToValue: '1-2 weeks',
        costSavings: '65% vs support team',
        efficiency: '24/7 availability, instant responses'
      },
      demoFeatures: [
        'Live chat automation',
        'Email response generation',
        'Ticket classification system',
        'Customer satisfaction tracking',
        'Escalation management'
      ]
    },
    'financial-analyzer': {
      name: 'Financial Data Analyzer',
      type: 'Heavy Plug',
      complexity: 'Enterprise',
      icon: TrendingUp,
      estimatedCost: 1156,
      monthlyCost: 78,
      deliveryTime: '10-20 hours',
      description: 'Advanced financial analysis with real-time market data and predictive modeling',
      targetAudience: 'Financial institutions, investment firms, corporate finance',
      demoAvailable: true,
      features: [
        'Real-time market data integration',
        'Advanced financial modeling and forecasting',
        'Risk assessment and portfolio analysis',
        'Automated compliance reporting',
        'Fraud detection algorithms',
        'Investment recommendation engine',
        'Performance benchmarking',
        'Regulatory compliance monitoring'
      ],
      technicalSpecs: {
        tokens: 95000,
        apis: ['Financial data APIs', 'Bloomberg', 'Reuters'],
        models: ['Claude Opus 4', 'ii-agent', 'Financial ML models'],
        security: 'Defense-Grade',
        infrastructure: 'Secure cloud, real-time processing'
      },
      roi: {
        timeToValue: '2-6 weeks',
        costSavings: '45% vs traditional systems',
        efficiency: 'Real-time analysis, automated reporting'
      },
      demoFeatures: [
        'Portfolio performance dashboard',
        'Risk analysis reports',
        'Market trend predictions',
        'Compliance monitoring',
        'Investment recommendations'
      ]
    }
  }

  const startDemo = (plugKey) => {
    setActiveDemo(plugKey)
    setDemoProgress(0)
    
    // Simulate demo progress
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const selectPlug = (plugKey) => {
    if (onPlugSelected) {
      onPlugSelected(samplePlugs[plugKey])
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Sample Plug Demonstrations
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Experience Deploy's capabilities with fully functional demo plugs. Try before you build with real automation examples across different complexity levels.
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="secondary" className="text-sm">
            <Play className="h-4 w-4 mr-1" />
            Interactive Demos Available
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Real-time Cost Calculation
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Plugs</TabsTrigger>
          <TabsTrigger value="lite">Lite Plugs</TabsTrigger>
          <TabsTrigger value="medium">Medium Plugs</TabsTrigger>
          <TabsTrigger value="heavy">Heavy Plugs</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(samplePlugs).map(([key, plug]) => (
              <PlugCard 
                key={key} 
                plugKey={key} 
                plug={plug} 
                activeDemo={activeDemo}
                demoProgress={demoProgress}
                onStartDemo={startDemo}
                onSelectPlug={selectPlug}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lite" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(samplePlugs)
              .filter(([key, plug]) => plug.type === 'Lite Plug')
              .map(([key, plug]) => (
                <PlugCard 
                  key={key} 
                  plugKey={key} 
                  plug={plug} 
                  activeDemo={activeDemo}
                  demoProgress={demoProgress}
                  onStartDemo={startDemo}
                  onSelectPlug={selectPlug}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(samplePlugs)
              .filter(([key, plug]) => plug.type === 'Medium Plug')
              .map(([key, plug]) => (
                <PlugCard 
                  key={key} 
                  plugKey={key} 
                  plug={plug} 
                  activeDemo={activeDemo}
                  demoProgress={demoProgress}
                  onStartDemo={startDemo}
                  onSelectPlug={selectPlug}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="heavy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(samplePlugs)
              .filter(([key, plug]) => plug.type === 'Heavy Plug')
              .map(([key, plug]) => (
                <PlugCard 
                  key={key} 
                  plugKey={key} 
                  plug={plug} 
                  activeDemo={activeDemo}
                  demoProgress={demoProgress}
                  onStartDemo={startDemo}
                  onSelectPlug={selectPlug}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Demo Modal */}
      {activeDemo && (
        <DemoModal 
          plug={samplePlugs[activeDemo]}
          progress={demoProgress}
          onClose={() => setActiveDemo(null)}
        />
      )}
    </div>
  )
}

const PlugCard = ({ plugKey, plug, activeDemo, demoProgress, onStartDemo, onSelectPlug }) => {
  const Icon = plug.icon
  const isRunningDemo = activeDemo === plugKey

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Standard': return 'bg-green-500'
      case 'Professional': return 'bg-blue-500'
      case 'Enterprise': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg ${getComplexityColor(plug.complexity)}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {plug.type}
            </Badge>
            <div className="text-sm text-gray-500">
              {plug.deliveryTime}
            </div>
          </div>
        </div>
        
        <CardTitle className="text-xl">{plug.name}</CardTitle>
        <CardDescription className="text-sm">
          {plug.description}
        </CardDescription>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            <span className="text-gray-500">Target: </span>
            <span className="font-medium">{plug.targetAudience}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Cost Information */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              ${plug.estimatedCost}
            </div>
            <div className="text-xs text-gray-500">Build Cost</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              ${plug.monthlyCost}/mo
            </div>
            <div className="text-xs text-gray-500">Operational</div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Features:</h4>
          <ul className="space-y-1">
            {plug.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
              </li>
            ))}
            <li className="text-xs text-gray-500">
              +{plug.features.length - 3} more features
            </li>
          </ul>
        </div>

        {/* ROI Information */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">ROI Metrics:</h4>
          <div className="grid grid-cols-1 gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Time to Value:</span>
              <span className="font-medium">{plug.roi.timeToValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Cost Savings:</span>
              <span className="font-medium text-green-600">{plug.roi.costSavings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Efficiency:</span>
              <span className="font-medium text-blue-600">{plug.roi.efficiency}</span>
            </div>
          </div>
        </div>

        {/* Demo Progress */}
        {isRunningDemo && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Demo Progress</span>
              <span>{demoProgress}%</span>
            </div>
            <Progress value={demoProgress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onStartDemo(plugKey)}
            disabled={isRunningDemo}
          >
            <Play className="h-4 w-4 mr-1" />
            {isRunningDemo ? 'Running...' : 'Try Demo'}
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onSelectPlug(plugKey)}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            Build This
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const DemoModal = ({ plug, progress, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <plug.icon className="h-6 w-6 text-blue-500" />
              <span>{plug.name} Demo</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
          <CardDescription>
            Interactive demonstration of {plug.name} capabilities
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Demo Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Demo Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Demo Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Demo Features</h3>
              <ul className="space-y-2">
                {plug.demoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${progress > (index + 1) * 20 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={progress > (index + 1) * 20 ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Specifications</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Tokens Required:</span>
                  <span className="ml-2 text-sm">{plug.technicalSpecs.tokens.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Security Tier:</span>
                  <Badge variant="outline" className="ml-2">{plug.technicalSpecs.security}</Badge>
                </div>
                <div>
                  <span className="text-sm font-medium">Key APIs:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {plug.technicalSpecs.apis.slice(0, 3).map((api, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{api}</Badge>
                    ))}
                    {plug.technicalSpecs.apis.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{plug.technicalSpecs.apis.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Completion */}
          {progress === 100 && (
            <div className="text-center space-y-4 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Demo Complete!
              </h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                You've experienced the full capabilities of {plug.name}. Ready to build your own?
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Rocket className="h-4 w-4 mr-2" />
                Start Building This Plug
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdatedSamplePlugs

