variable "access_key" {
  description = "Azure Access Key"
  type        = string
  nullable    = false
}

variable "secret_key" {
  description = "Azure Secret Key"
  type        = string
  nullable    = false
}

variable "subscription_id" {
  description = "Azure Subscription Id"
  type        = string
  nullable    = false
}

variable "tenant_id" {
  description = "Azure Tenenant Id"
  type        = string
  nullable    = false
}

variable "region" {
  description = "Azure Region"
  type        = string
  default = "East US"
}

variable "resource_group" {
  description = "Azure Resource Group"
  type        = string
  default = "pos-graduacao"
}
