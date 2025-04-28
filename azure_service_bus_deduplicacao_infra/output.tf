output "servicebus_connectionstring" {
  description = "Connection string of service bus"
  value = azurerm_servicebus_namespace_authorization_rule.servicebus_deduplicate.primary_connection_string
  sensitive = true
}
