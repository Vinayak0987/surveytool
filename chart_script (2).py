import plotly.graph_objects as go
import plotly.io as pio

# Data for the workflow steps
steps_data = {
    "workflow_steps": [
        {"step": 1, "title": "Survey Design", "activities": ["AI Question Generation", "Multi-language Setup", "Logic Configuration", "Quality Rules"], "icon": "design"},
        {"step": 2, "title": "Audience Targeting", "activities": ["Geographic Selection", "Demographic Filters", "Sample Calculation", "Contact Management"], "icon": "targeting"},
        {"step": 3, "title": "Multi-Channel Distribution", "activities": ["WhatsApp Deployment", "Email Campaigns", "Voice/Avatar Delivery", "Web Portal"], "icon": "distribution"},
        {"step": 4, "title": "Real-time Monitoring", "activities": ["Response Tracking", "Quality Assurance", "Performance Metrics", "Alert System"], "icon": "monitoring"},
        {"step": 5, "title": "Data Processing", "activities": ["Auto-validation", "AI Coding", "Paradata Analysis", "Error Detection"], "icon": "processing"},
        {"step": 6, "title": "AI Insights", "activities": ["Pattern Recognition", "Trend Analysis", "Predictive Modeling", "Recommendations"], "icon": "insights"},
        {"step": 7, "title": "Reporting & Action", "activities": ["Dashboard Reports", "Policy Insights", "Export Tools", "Implementation"], "icon": "reporting"}
    ]
}

# Brand colors - professional government styling
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C', '#964325']

# Prepare data for plotting
steps = [item['step'] for item in steps_data['workflow_steps']]
titles = [item['title'] for item in steps_data['workflow_steps']]
y_values = [1] * len(steps)

# Create hover text with activities
hover_texts = []
for item in steps_data['workflow_steps']:
    activities = [act[:15] for act in item['activities'][:4]]
    hover_text = f"<b>{item['title']}</b><br>" + "<br>".join(activities)
    hover_texts.append(hover_text)

# Create the figure
fig = go.Figure()

# Add connecting arrows between steps
for i in range(len(steps)-1):
    # Arrow line
    fig.add_trace(go.Scatter(
        x=[steps[i] + 0.35, steps[i+1] - 0.35], 
        y=[1, 1],
        mode='lines',
        line=dict(color='#13343B', width=4),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Arrow head
    fig.add_trace(go.Scatter(
        x=[steps[i+1] - 0.35],
        y=[1],
        mode='markers',
        marker=dict(
            symbol='triangle-right',
            size=12,
            color='#13343B'
        ),
        showlegend=False,
        hoverinfo='skip'
    ))

# Add the workflow steps as large circles
fig.add_trace(go.Scatter(
    x=steps,
    y=y_values,
    mode='markers+text',
    marker=dict(
        size=80,
        color=colors[:len(steps)],
        line=dict(width=3, color='white')
    ),
    text=[f"<b>{step}</b>" for step in steps],
    textposition='middle center',
    textfont=dict(size=20, color='white', family='Arial Black'),
    hovertext=hover_texts,
    hoverinfo='text',
    showlegend=False,
    cliponaxis=False
))

# Add step titles below circles
fig.add_trace(go.Scatter(
    x=steps,
    y=[0.6] * len(steps),
    mode='text',
    text=[f"<b>{title[:15]}</b>" for title in titles],
    textposition='middle center',
    textfont=dict(size=12, color='#13343B', family='Arial'),
    showlegend=False,
    hoverinfo='skip'
))

# Update layout with professional government styling
fig.update_layout(
    title=dict(
        text="<b>AI Survey Platform Workflow</b>",
        font=dict(size=18, color='#13343B', family='Arial'),
        x=0.5
    ),
    xaxis=dict(
        showticklabels=False,
        showgrid=False,
        zeroline=False,
        range=[0.5, 7.5]
    ),
    yaxis=dict(
        showticklabels=False,
        showgrid=False,
        zeroline=False,
        range=[0.2, 1.4]
    ),
    plot_bgcolor='white',
    paper_bgcolor='white',
    height=300
)

# Save the chart
fig.write_image("ai_survey_workflow.png")