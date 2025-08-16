import plotly.graph_objects as go

# Data from the provided JSON with abbreviated metric names (15 char limit)
metrics = ['Response Rate', 'Data Quality', 'Languages', 'Cost Reduction', 'Error Rate', 'Proc Speed']
traditional_values = [45, 72, 3, 0, 8, 20]
ai_values = [82, 91, 70, 68, 2, 100]

# Create horizontal bar chart
fig = go.Figure()

# Add traditional methods bars (gray)
fig.add_trace(go.Bar(
    y=metrics,
    x=traditional_values,
    name='Traditional',
    orientation='h',
    marker_color='#808080',  # Gray color
    cliponaxis=False
))

# Add AI-powered bars (blue)
fig.add_trace(go.Bar(
    y=metrics,
    x=ai_values,
    name='AI-Powered',
    orientation='h',
    marker_color='#1f77b4',  # Blue color
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='AI vs Traditional Survey Methods',
    xaxis_title='Score/Value',
    yaxis_title='Metrics',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image('ai_survey_comparison.png')