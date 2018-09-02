import React, { Component } from 'react'

export class Promise extends Component {

    constructor (props) {
        super (props)
        this.state = {
            pending: null,
            error: null,
            result: null,
            skipped: null
        }
    }

    componentDidMount () {
        this.onInitAndUpdate()
    }

    componentWillUnmount () {
        this.__unmounted = true
    }

    setState (...args) {
        if(!this.__unmounted)
            super.setState(...args)
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props)
            this.onInitAndUpdate()
    }

    onInitAndUpdate () {
        if(!this.props.promise) {
            throw new Error('Promise function is missing.')
        }
        if(!this.props.skip || (typeof this.props.skip === 'function' && !this.props.skip(this.props))) {
            this.executePromise()
        } else {
            this.setState({ pending: false, skipped: true })
        }
    }

    executePromise (options = (this._backedOptions || this.props), { mixin = false, replayed = false } = {}) {
        const { promise, then } = this.props
        this.setState({ pending: true, skipped: false })
        this._backedOptions = mixin ? { ...options, ...this._backedOptions } : options
        promise(options, { replayed })
            .then(result => {
                if(typeof then === 'function') {
                    result = then(result)
                }
                this.setState({ result, error: null })
                return result
            })
            .catch(error => {
                this.setState({ error, result: null })
            })
            .then(() => {
                this.setState({
                    pending: false
                })
            })
    }

    render () {
        const { pending } = this.state
        const { render } = this.props

        if(pending === null) {
            return null
        }

        return render({
            ...this.state,
            replay: (options, mixin = true) => this.executePromise.bind(this)(options, { mixin, replayed: true })
        })

    }
}