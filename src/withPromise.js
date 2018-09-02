import React, { Component } from 'react'
import { Promise } from './Promise'

export function withPromise({
    skip,
    promise,
    then,
    props = _ => _
}) {
    return function (Component) {
        return function (ownProps) {
            const children = promiseProps => {
                const mixedProps = {
                    ...ownProps,
                    ...props(promiseProps, ownProps)
                }
                return (
                    <Component { ...mixedProps } />
                )
            }
            return (
                <Promise
                    skip={skip}
                    promise={promise}
                    render={children}
                    then={then}
                    { ...ownProps }
                />
            )
        }
    }
}