/**
 * fSpy
 * Copyright (c) 2020 - Per Gantelius
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import ControlPoint from './control-point'
import Point2D from '../../solver/point-2d'
import { Group, RegularPolygon } from 'react-konva'
import { Palette } from '../../style/palette'
import ControlPolyline from './control-polyline'

interface ReferenceDistanceAnchorControlProps {
  absolutePosition: Point2D
  origin: Point2D
  uIntersection: Point2D
  vIntersection: Point2D
  anchorPositionIsValid: boolean
  dragCallback(position: Point2D): void
}

export default class ReferenceDistanceAnchorControl extends React.PureComponent<ReferenceDistanceAnchorControlProps> {

  render() {
    return (
      <Group>
        {this.renderLines()}
        {this.renderPositionWarning()}
        <ControlPoint
          absolutePosition={this.props.absolutePosition}
          onControlPointDrag={this.props.dragCallback}
          fill={Palette.referenceDistanceControlColor}
        />
      </Group>
    )
  }

  private renderPositionWarning() {
    if (this.props.anchorPositionIsValid) {
      return null
    }

    return (
      <RegularPolygon
        sides={3}
        radius={15}
        x={this.props.absolutePosition.x}
        y={this.props.absolutePosition.y}
        stroke={Palette.orange}
        strokeWidth={1}
      />
    )
  }

  private renderLines() {
    if (!this.props.anchorPositionIsValid) {
      return null
    }

    return (
      <Group>
        <ControlPolyline
          dimmed={true}
          dashed={true}
          color={Palette.referenceDistanceControlColor}
          points={[this.props.origin, this.props.uIntersection]}
        />
        <ControlPolyline
          dimmed={true}
          dashed={true}
          color={Palette.referenceDistanceControlColor}
          points={[this.props.origin, this.props.vIntersection]}
        />
        <ControlPolyline
          dimmed={true}
          dashed={true}
          color={Palette.referenceDistanceControlColor}
          points={[this.props.absolutePosition, this.props.uIntersection]}
        />
        <ControlPolyline
          dimmed={true}
          dashed={true}
          color={Palette.referenceDistanceControlColor}
          points={[this.props.absolutePosition, this.props.vIntersection]}
        />
      </Group>
    )
  }
}
