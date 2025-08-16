import plotly.graph_objects as go
import plotly.express as px

# Create the system architecture diagram
fig = go.Figure()

# Define the complete system layers with abbreviated component names (≤15 chars)
layers_data = {
    'Survey Create': {
        'y': 5.5, 
        'components': ['No-code Build', 'Question Bank', 'AI Generate', 'Multi-lang'],
        'color': '#1FB8CD'
    },
    'Distribution': {
        'y': 4.5, 
        'components': ['WhatsApp API', 'Email', 'Web Portal', 'Phone/IVR', 'AI Avatar'],
        'color': '#5D878F'
    },
    'Collection': {
        'y': 3.5, 
        'components': ['Real-time Val', 'Paradata', 'GPS Track', 'Quality Check'],
        'color': '#2E8B57'
    },
    'AI Processing': {
        'y': 2.5, 
        'components': ['NLP Analysis', 'Auto-coding', 'Sentiment', 'Smart Insight'],
        'color': '#D2BA4C'
    },
    'Data Storage': {
        'y': 1.5, 
        'components': ['SQL Database', 'NoSQL Store', 'Security', 'Backup Sys'],
        'color': '#DB4545'
    },
    'Analytics': {
        'y': 0.5, 
        'components': ['Dashboards', 'Export Tools', 'Visualization', 'Reporting'],
        'color': '#B4413C'
    },
    'Quality Mon': {
        'y': -0.5, 
        'components': ['Enum Track', 'Response Qual', 'Performance', 'Metrics'],
        'color': '#964325'
    }
}

# Create boxes for each component
box_width = 1.6
box_height = 0.3
text_size = 9

for layer_name, layer_info in layers_data.items():
    y_pos = layer_info['y']
    components = layer_info['components']
    color = layer_info['color']
    
    # Calculate x positions to center components
    total_width = len(components) * box_width + (len(components) - 1) * 0.2
    start_x = (10 - total_width) / 2
    
    for i, component in enumerate(components):
        x_pos = start_x + i * (box_width + 0.2)
        
        # Add rectangle for each component
        fig.add_shape(
            type="rect",
            x0=x_pos, y0=y_pos - box_height/2,
            x1=x_pos + box_width, y1=y_pos + box_height/2,
            fillcolor=color,
            line=dict(color="white", width=2),
            opacity=0.8
        )
        
        # Add text for each component
        fig.add_trace(go.Scatter(
            x=[x_pos + box_width/2],
            y=[y_pos],
            text=component,
            mode='text',
            textfont=dict(size=text_size, color='white', family='Arial Bold'),
            showlegend=False,
            hoverinfo='none'
        ))

# Add layer labels on the left
for layer_name, layer_info in layers_data.items():
    fig.add_trace(go.Scatter(
        x=[-0.5],
        y=[layer_info['y']],
        text=layer_name,
        mode='text',
        textfont=dict(size=12, color=layer_info['color'], family='Arial Bold'),
        showlegend=False,
        hoverinfo='none'
    ))

# Add data flow arrows between layers
layer_positions = [info['y'] for info in layers_data.values()]
for i in range(len(layer_positions) - 1):
    y_start = layer_positions[i] - 0.2
    y_end = layer_positions[i + 1] + 0.2
    
    # Add multiple arrows across the width
    for x_arrow in [2, 4, 6, 8]:
        fig.add_annotation(
            x=x_arrow, y=y_start,
            ax=x_arrow, ay=y_end,
            xref='x', yref='y',
            axref='x', ayref='y',
            showarrow=True,
            arrowhead=2,
            arrowsize=1,
            arrowwidth=2,
            arrowcolor='#1FB8CD',
            opacity=0.7
        )

# Update layout
fig.update_layout(
    title=dict(
        text="AI Smart Survey Architecture",
        x=0.5,
        font=dict(size=18, family='Arial Bold')
    ),
    xaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[-1, 10]
    ),
    yaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[-1, 6]
    ),
    plot_bgcolor='white',
    paper_bgcolor='#f8f9fa',
    showlegend=False
)

# Save the chart
fig.write_image("survey_architecture.png", width=1200, height=900)