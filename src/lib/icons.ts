import {
  Home, Bot, Search, Heart, MessageSquare, Footprints, FolderOpen,
  Wrench, Landmark, Tag, Plus, Calendar, DollarSign, User, ClipboardList,
  Eye, BarChart3, Bell, Lightbulb, FileEdit, Zap, Send, Loader2,
  ChevronDown, Settings, LogOut, X, Check, Menu, MapPin, Filter,
  Grid3X3, List, ArrowLeft, ArrowRight, Star, Shield, TrendingUp,
  Building2, Calculator, FileText, Users, Phone, Mail, Clock,
  AlertTriangle, CheckCircle, Circle, MoreHorizontal, ExternalLink,
  Camera, Thermometer, Bed, Droplets, ArrowDown, PenTool,
  Paperclip, Scale, Hammer, Bug, Ruler, Pin, Mic,
  Brain, AlertCircle,
  type LucideIcon,
} from 'lucide-react';

// Navigation icons
export const navIcons: Record<string, LucideIcon> = {
  Dashboard: Home,
  'My Agent': Bot,
  'Search Properties': Search,
  'Saved Properties': Heart,
  'AI Chat': MessageSquare,
  Walkthroughs: Footprints,
  Documents: FolderOpen,
  Professionals: Wrench,
  Mortgage: Landmark,
  Transactions: ClipboardList,
  'My Listings': Tag,
  'Create Listing': Plus,
  Showings: Calendar,
  Offers: DollarSign,
  'Seller AI Chat': MessageSquare,
};

// Agent icons by ID
export const agentIcons: Record<string, LucideIcon> = {
  alex: Bot,
  jordan: Home,
  sam: Zap,
  morgan: Tag,
};

// Activity type icons
export const activityIcons: Record<string, LucideIcon> = {
  search: Search,
  analysis: BarChart3,
  alert: Bell,
  recommendation: Lightbulb,
  message: MessageSquare,
  update: FileEdit,
};

// Generic icon name map (for string-based icon references from lib data)
export const iconMap: Record<string, LucideIcon> = {
  Home, Bot, Search, Heart, MessageSquare, Footprints, FolderOpen,
  Wrench, Landmark, Tag, DollarSign, ClipboardList, BarChart3, Bell,
  Lightbulb, FileEdit, Zap, FileText, Check, AlertTriangle, CheckCircle,
  Circle, Camera, Shield, Users, Scale, Thermometer, Bed, Droplets,
  ArrowDown, PenTool, Paperclip, Hammer, Bug, Ruler, Pin, Mic, Brain, AlertCircle,
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  check: Check,
  circle: Circle,
  // Document category/type icons
  ChefHat: Home, // fallback
};

// Dashboard stat icons
export const statIcons: Record<string, LucideIcon> = {
  'Properties Viewed': Eye,
  'Saved Properties': Heart,
  'AI Analyses': Bot,
  'Estimated Savings': DollarSign,
};

// Re-export commonly used icons
export {
  Home, Bot, Search, Heart, MessageSquare, Footprints, FolderOpen,
  Wrench, Landmark, Tag, Plus, Calendar, DollarSign, User, ClipboardList,
  Eye, BarChart3, Bell, Lightbulb, FileEdit, Zap, Send, Loader2,
  ChevronDown, Settings, LogOut, X, Check, Menu, MapPin, Filter,
  Grid3X3, List, ArrowLeft, ArrowRight, Star, Shield, TrendingUp,
  Building2, Calculator, FileText, Users, Phone, Mail, Clock,
  AlertTriangle, CheckCircle, Circle, MoreHorizontal, ExternalLink,
  Camera, Thermometer, Bed, Droplets, ArrowDown, PenTool,
  Paperclip, Scale, Hammer, Bug, Ruler, Pin, Mic, Brain, AlertCircle,
  type LucideIcon,
};
