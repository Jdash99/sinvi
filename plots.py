from bokeh.plotting import *
from bokeh.embed import file_html
from bokeh.resources import CDN

import numpy as np


# Define a function that will return an HTML snippet.
def build_plot(data, policy_params):

    y_data = data['FIP']
    x_data = np.arange(1, len(y_data))
    reorder_point = np.array([])
    if policy_params['method'] == "Qs":
        reorder_point = np.ones(len(y_data)) * policy_params['param2']

    figure(
        title="Policy {}: {}  {}: {}".format(
            policy_params['method'][0],
            policy_params['param1'],
            policy_params['method'][1],
            policy_params['param2']
            ),
        #title_font_size="20pt",
        plot_width=600,
        plot_height=400
        #outline_line_color="red",
        #x_axis_type="datetime"
    )
    hold()

    # Create a line plot from our data.
    line(x_data, y_data, legend="Simulation")
    if reorder_point.any():
        line(x_data, reorder_point, color="red", legend="Reorder point")

    grid().grid_line_alpha=0.3
    #ygrid().grid_line_color = None           # color, or None, to suppress the line
    # ygrid().grid_line_width =            # line width for grid lines
    # axis().major_label_text_font_size =  # "12pt", "1.5em", "10px", etc
    # axis().major_label_text_font_style = # "bold", "normal", "italic"
    # axis().major_label_standoff =        # distance of tick labels from ticks
    # axis().axis_line_color =             # color, or None, to suppress the line
    # xaxis().major_label_orientation =    # radians, "horizontal", "vertical", "normal"
    # xaxis().major_tick_in =              # distance ticks extends into the plot
    # xaxis().major_tick_out =             # and distance they extend out
    # xaxis().major_tick_line_color =      # color, or None, to suppress the line

    # Create an HTML snippet of our plot.
    snippet = file_html(curplot(), CDN, "Test")

    # Return the snippet we want to place in our page.
    return snippet
